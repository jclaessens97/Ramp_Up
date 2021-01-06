import {
  tensor1d,
} from '@tensorflow/tfjs';
import labels from '../static/ml/encoded_labels.json';

function organizeDictToPredict(tensors) {
  return {
    danceability: tensors.danceability,
    energy: tensors.energy,
    valence: tensors.valence,
    time_signature: tensors.time_signature,
    key: tensors.key,
    loudness: tensors.loudness,
    mode: tensors.mode,
    tempo: tensors.tempo,
    speechiness: tensors.speechiness,
    acousticness: tensors.acousticness,
    instrumentalness: tensors.instrumentalness,
    liveness: tensors.liveness,
  };
}

export function getSupportedGenres() {
  return [...Object.keys(labels), 'other'];
}

export function getGenreFromTrack(model, track) {
  let input = { ...track.audioFeatures };

  Object.keys(input).forEach((k) => {
    input[k] = tensor1d([input[k]]).reshape([-1, 1]);

    if (k === 'time_signature' || k === 'key' || k === 'mode') {
      input[k] = input[k].cast('int32');
    } else {
      input[k] = input[k].cast('float32');
    }
  });

  input = organizeDictToPredict(input);

  const prediction = model.predict(Object.values(input)).dataSync();
  const supportedGenres = getSupportedGenres();

  const highestProbability = Math.max(...prediction);
  const genre = {};

  if (highestProbability > 0.85) {
    const indexOfhighestProbabilityLabel = prediction.indexOf(highestProbability);
    genre.name = supportedGenres[indexOfhighestProbabilityLabel];
  } else {
    genre.name = supportedGenres[supportedGenres.length - 1];
  }

  genre.probability = highestProbability;
  return genre;
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
