import { stringifyParams, parseParams } from '../helpers/urlUtils';

const TOKEN_NAME = 'RampUp_Spotify';

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
  storeAccessToken(params.access_token);
  return params.access_token;
}

function storeAccessToken(accessToken) {
  window.localStorage.setItem(TOKEN_NAME, `Bearer ${accessToken}`);
}

export function getAccessToken() {
  return window.localStorage.getItem(TOKEN_NAME);
}

export function logout(ctx) {
  window.localStorage.removeItem(TOKEN_NAME);
  ctx.$router.push('/login');
}
