/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

const initialState = () => ({
  options: null,
});

export const state = initialState;

export const mutations = {
  setOptions(state, opts) {
    state.options = opts;
  },
  reset(state) {
    const s = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
};
