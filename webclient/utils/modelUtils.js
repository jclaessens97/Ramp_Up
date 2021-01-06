import {
  loadGraphModel,
} from '@tensorflow/tfjs';

export async function loadGenreModel() {
  const model = await loadGraphModel('/model/tfjs_model/model.json');
  return model;
}

export default {
  loadGenreModel,
};
