import os
import glob
import tensorflow as tf
import numpy as np
import pandas as pd
import json
import wandb
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers.experimental.preprocessing import Normalization
from tensorflow.keras.layers.experimental.preprocessing import CategoryEncoding
from pathlib import Path
from keras.utils import to_categorical
from wandb.keras import WandbCallback

# Set to true to print every step and data
VERBOSE = False

# Creates dist folder to save the production-model and -metadata
Path("dist/").mkdir(parents=True, exist_ok=True)

# Initialize wandb to visualize training
wandb.init(project="spotify-ramp_up")

#
# PREPARE DATASET
#
input_filenames = [i for i in glob.glob(f"input/*.csv")]
all_df = pd.concat([pd.read_csv(f) for f in input_filenames])
different_genres_amount = len(set(all_df["genre"]))

if VERBOSE:
    print(all_df.shape)
    print(all_df.head())
    print('\r\nnumber of different genres available: {}'.format(different_genres_amount))

val_df = all_df.sample(frac=0.2, random_state=1337)
train_df = all_df.drop(val_df.index)

if VERBOSE:
    print(
        "using %d samples for training and %d for validation"
        % (len(train_df), len(val_df))
    )

def map_to_integers(values):
    integer_mapping = {}
    i = 0
    for val in values:
        if val not in integer_mapping:
            integer_mapping[val] = i
            i += 1

    labels = [integer_mapping[val] for val in values]
    with open("dist/encoded_labels.json", "w") as path:
        json.dump(integer_mapping, path)
    return labels

def dataframe_to_dataset(df, ignore_columns=[]):
    df = df.copy()
    for col in ignore_columns:
        df.pop(col)
    labels = df.pop("genre")
    labels = map_to_integers(labels)
    ds = tf.data.Dataset.from_tensor_slices((dict(df), labels))
    ds = ds.shuffle(buffer_size=len(df))
    return ds

ignore_columns = ["id", "duration_ms"]
train_ds = dataframe_to_dataset(train_df, ignore_columns=ignore_columns)
val_ds = dataframe_to_dataset(val_df, ignore_columns=ignore_columns)

if VERBOSE:
    for x, y in train_ds.take(1):
        print("input:", x)
        print("genre:", y)  

train_ds = train_ds.batch(32)
val_ds = val_ds.batch(32)

#
# BUILD MODEL
#
# Categorical features (as integers)
key = keras.Input(shape=(1,), name="key", dtype="int64")
mode = keras.Input(shape=(1,), name="mode", dtype="int64")
time_signature = keras.Input(shape=(1,), name="time_signature", dtype="int64")

# Numerical features
acousticness = keras.Input(shape=(1,), name="acousticness")
danceability = keras.Input(shape=(1,), name="danceability")
energy = keras.Input(shape=(1,), name="energy")
instrumentalness = keras.Input(shape=(1,), name="instrumentalness")
liveness = keras.Input(shape=(1,), name="liveness")
loudness = keras.Input(shape=(1,), name="loudness")
speechiness = keras.Input(shape=(1,), name="speechiness")
valence = keras.Input(shape=(1,), name="valence")
tempo = keras.Input(shape=(1,), name="tempo")

all_inputs = [
    key,
    mode,
    time_signature,
    acousticness,
    danceability,
    energy,
    instrumentalness,
    liveness,
    loudness,
    speechiness,
    valence,
    tempo,    
]

def encode_integer_categorical_feature(feature, name, dataset, max_tokens=None):
    encoder = CategoryEncoding(max_tokens=max_tokens, output_mode="binary")

    feature_ds = dataset.map(lambda x, y: x[name])
    feature_ds = feature_ds.map(lambda x: tf.expand_dims(x, -1))

    encoder.adapt(feature_ds)

    encoded_feature = encoder(feature)
    return encoded_feature

def encode_numerical_feature(feature, name, dataset):
    normalizer = Normalization()

    feature_ds = dataset.map(lambda x, y: x[name])
    feature_ds = feature_ds.map(lambda x: tf.expand_dims(x, -1))

    normalizer.adapt(feature_ds)

    encoded_feature = normalizer(feature)
    return encoded_feature

# Integer categorical features
key_encoded = encode_integer_categorical_feature(key, "key", train_ds, max_tokens=12) # 0 to 11
mode_encoded = encode_integer_categorical_feature(mode, "mode", train_ds, max_tokens=2) # 0 or 1
time_signature_encoded = encode_integer_categorical_feature(time_signature, "time_signature", train_ds, max_tokens=7) # The time signature ranges from 3 to 7 indicating time signatures of “3/4”, to “7/4”.

# Numerical features
acousticness_encoded = encode_numerical_feature(acousticness, "acousticness", train_ds)
danceability_encoded = encode_numerical_feature(danceability, "danceability", train_ds)
energy_encoded = encode_numerical_feature(energy, "energy", train_ds)
instrumentalness_encoded = encode_numerical_feature(instrumentalness, "instrumentalness", train_ds)
liveness_encoded = encode_numerical_feature(liveness, "liveness", train_ds)
loudness_encoded = encode_numerical_feature(loudness, "loudness", train_ds)
speechiness_encoded = encode_numerical_feature(speechiness, "speechiness", train_ds)
valence_encoded = encode_numerical_feature(valence, "valence", train_ds)
tempo_encoded = encode_numerical_feature(tempo, "tempo", train_ds)

all_features = layers.concatenate(
    [
        key_encoded,
        mode_encoded,
        time_signature_encoded,
        acousticness_encoded,
        danceability_encoded,
        energy_encoded,
        instrumentalness_encoded,
        liveness_encoded,
        loudness_encoded,
        speechiness_encoded,
        valence_encoded,
        tempo_encoded,
    ]
)

input_layer = layers.Dense(32, activation="relu")(all_features)
hidden_1 = layers.Dense(32, activation="relu")(input_layer)
output = layers.Dense(different_genres_amount, activation="softmax")(hidden_1)

model = keras.Model(all_inputs, output)
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=['accuracy']
)

if VERBOSE:
    model.summary()
    keras.utils.plot_model(model, show_shapes=True, rankdir="LR")

#
# TRAIN MODEL
#
model.fit(train_ds, epochs=50, validation_data=val_ds, callbacks=[WandbCallback()])

#
# EVALUATE MODEL
#
evaluation = model.evaluate(train_ds)
print("Evaluation: " + str(evaluation))

# 
# SAVE MODEL
# Save model in latest TF SavedModel format
#
model.save("model")

# Also save model to w&b dashboard
model.save(os.path.join(wandb.run.dir, "model"))
