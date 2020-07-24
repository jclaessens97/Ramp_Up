export function stringifyParams(params) {
  return Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export function parseParams(params) {
  const obj = {};

  params.split('&')
    .forEach((p) => {
      const [k, v] = p.split('=');
      obj[k] = v;
    });

  return obj;
}
