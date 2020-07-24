'''
    This script tests the model on unseen samples.
    These values are hardcoded values I got from the spotify api for a song I know from which genre it is.
'''
import json
import pandas as pd
import tensorflow as tf
from keras.models import load_model

RED = '31m'
GREEN = '32m'

samples = {
    'hiphop': { # Sevn Alias - Herres
        "danceability": 0.851,
        "energy": 0.865,
        "key": 1,
        "loudness": -4.339,
        "mode": 1,
        "speechiness": 0.235,
        "acousticness": 0.0109,
        "instrumentalness": 0.00352,
        "liveness": 0.346,
        "valence": 0.866,
        "tempo": 130.015,
        "time_signature": 4
    },
    'electronic': { # Martin Garrix & Tiesto - The only way is up
        "danceability": 0.613,
        "energy": 0.739,
        "key": 1,
        "loudness": -7.779,
        "mode": 0,
        "speechiness": 0.031,
        "acousticness": 0.00322,
        "instrumentalness": 0.856,
        "liveness": 0.0842,
        "valence": 0.15,
        "tempo": 128.18,
        "time_signature": 4
    },
    'classical': { # Ludwig Van Beethoven - Fur Elise
        "danceability": 0.303,
        "energy": 0.108,
        "key": 9,
        "loudness": -27.433,
        "mode": 0,
        "speechiness": 0.0473,
        "acousticness": 0.994,
        "instrumentalness": 0.877,
        "liveness": 0.0805,
        "valence": 0.18,
        "tempo": 126.931,
        "time_signature": 3
    },
    'metal': { # System of a down - Chop Suey!
        "danceability": 0.413,
        "energy": 0.933,
        "key": 7,
        "loudness": -3.912,
        "mode": 0,
        "speechiness": 0.127,
        "acousticness": 0.000365,
        "instrumentalness": 0.0023,
        "liveness": 0.121,
        "valence": 0.325,
        "tempo": 127.202,
        "time_signature": 4
    },
}

def get_key_by_value(dict, value):
    for k, v in dict.items():
        if v == value:
            return k

def color_text(color, text):
    colored_text = f"\033[{color}{text}\033[00m"
    return colored_text

model = load_model('model')



with (open('dist/encoded_labels.json', 'r')) as path:
    encoded_labels = json.load(path)

for sample_k, sample_v in samples.items():
    input_dict = {name: tf.convert_to_tensor([value]) for name, value in sample_v.items()}
    predictions = model.predict(input_dict)
    classes = predictions.argmax(axis=-1)

    predicted_val = get_key_by_value(encoded_labels, classes[0])
    output_text = 'This song is predicted to be {}, and is actually {}'.format(predicted_val, sample_k)

    if predicted_val == sample_k:
        print(color_text(GREEN, output_text))
    else:
        print(color_text(RED, output_text))
