/* eslint-disable consistent-return */

export default function ({ store, redirect }) {
  if (!store.state.generator.options) {
    return redirect('/');
  }
}
