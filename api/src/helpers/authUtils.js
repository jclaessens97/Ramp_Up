export function getBearerTokenFromHeader(authorizationHeader) {
  return authorizationHeader.slice(7);
}

export default {
  getBearerTokenFromHeader,
};
