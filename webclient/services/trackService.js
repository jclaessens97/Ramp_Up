/* eslint-disable */

import {
  loadGraphModel,
  tensor1d,
  registerOp,
} from '@tensorflow/tfjs';

function denseBinCount(node) {
  const [input, size, weights] = node.inputs;
  const [tidx, t, binaryOutput] = node.attrs;

}

async function loadModel() {
  const model = await loadGraphModel('/model/tfjs_model/model.json');

  registerOp('DenseBinCount', denseBinCount);

  // console.log(model);
  return model;
}


function organizeDictToPredict(tensors) {
  return {
    danceability: tensors['danceability'],
    energy: tensors['energy'],
    valence: tensors['valence'],
    time_signature: tensors['time_signature'],
    key: tensors['key'],
    loudness: tensors['loudness'],
    mode: tensors['mode'],
    tempo: tensors['tempo'],
    speechiness: tensors['speechiness'],
    acousticness: tensors['acousticness'],
    instrumentalness: tensors['instrumentalness'],
    liveness: tensors['liveness'],
  }
}

export async function getGenreFromTrack(track) {
  const model = await loadModel();

  // input_dict = {name: tf.convert_to_tensor([value]) for name, value in sample_v.items()}

  let input = { ...track.audioFeatures };
  Object.keys(input).forEach((k) => {
    input[k] = tensor1d([input[k]]).reshape([-1, 1]);

    if (k === 'time_signature' || k === 'key' || k === 'mode') {
      input[k] = input[k].cast('int32');
    } else {
      input[k] = input[k].cast('float32');
    }

    console.log(`${k}: ${input[k].dtype}`);
  });

  input = organizeDictToPredict(input);
  const prediction = model.predict(Object.values(input)).dataSync();
  console.log(prediction);
}

export function mergeAudioFeaturesToTracks(tracks, audioFeatures) {
  return tracks.map((t) => {
    const feature = audioFeatures.find((f) => f.id === t.track.id);

    delete feature.id;
    delete feature.uri;
    delete feature.type;
    delete feature.track_href;
    delete feature.analysis_url;
    delete feature.duration_ms;

    const { track } = t;
    track.audioFeatures = feature;
    return track;
  });
}

export default {
  getGenreFromTrack,
};
