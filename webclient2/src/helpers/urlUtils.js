export function stringifyParams(params) {
  return Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export function parseParams(params) {
  return params.split('&')
    .map((p) => {
      const [k, v] = p.split('=');

      const obj = {};
      obj[k] = v;
      return obj;
    })
}