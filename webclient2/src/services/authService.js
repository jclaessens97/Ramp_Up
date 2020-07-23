import { stringifyParams, parseParams } from '../helpers/urlUtils';

export function requestAuthorization() {
  const params = {
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    scope: ['user-library-read', 'playlist-modify-private'].join(' '),
  };

  const url = `https://accounts.spotify.com/authorize?${stringifyParams(params)}`;
  window.location.replace(url);
}

export function parseAccessToken(ctx) {
  const { hash } = ctx.$route;
  const params = parseParams(hash.slice(1));
  storeAccessToken(params.accessToken);
  ctx.$router.push('/home');
}

function storeAccessToken(accessToken) {
  console.log(import.meta.env.VITE_TOKEN_KEY_NAME);
  window.localStorage.setItem(import.meta.env.VITE_TOKEN_KEY_NAME, `Bearer ${accessToken}`);
}

export function getAccessToken(accessToken) {
  window.localStorage.getItem(import.meta.env.VITE_TOKEN_KEY_NAME);
}