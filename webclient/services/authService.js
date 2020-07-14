import queryString from 'query-string';

// List of scopes: https://developer.spotify.com/documentation/general/guides/scopes/
const getScopes = () => [
  'user-library-read',
  'playlist-modify-private',
];

export function getAuthUrl() {
  const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
  const qry = queryString.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    response_type: 'token',
    scope: encodeURIComponent(getScopes().join(' ')),
  });

  return `${AUTH_BASE_URL}?${qry}`;
}

export function parseAccessTokenFromHash(hash) {
  const { access_token } = queryString.parse(hash);
  return access_token;
}
