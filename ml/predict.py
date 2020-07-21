import tensorflow as tf
import json
import pandas as pd
from keras.models import load_model

model = load_model("models/model")
model.summary()

sample = {
    "danceability": 0.824,
    "energy": 0.818,
    "key": 9,
    "loudness": -7.779,
    "mode": 1,
    "speechiness": 0.206,
    "acousticness": 0.0128,
    "instrumentalness": 0,
    "liveness": 0.0927,
    "valence": 0.567,
    "tempo": 104.997,
    "time_signature": 4
}

input_dict = {name: tf.convert_to_tensor([value]) for name, value in sample.items()}
predictions = model.predict(input_dict)
classes = predictions.argmax(axis=-1)

with (open('models/model/encoded_labels.json', "r")) as path:
    data = json.load(path)
    
def get_key_by_value(dict, value):
    for k, v in dict.items():
        if v == value:
            return k

print(predictions)
print(classes)

print('This song is most probably {}'.format(get_key_by_value(data, classes[0])))
