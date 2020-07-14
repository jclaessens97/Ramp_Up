import requestUtils from '../../helpers/requestUtils';

export default class SpotifyClient {
  constructor() {
    this.SPOTIFY_API_URL = 'https://api.spotify.com/v1';
    this.axios = requestUtils.createAxiosInstance(this.SPOTIFY_API_URL);
  }

  getLikedTracksByUserToken(accessToken, offset = 0, limit = 20) {
    return requestUtils.GET(this.axios, '/me/tracks', accessToken, { offset, limit });
  }

  async getAllLikedTracksByUserToken(accessToken) {
    const firstBatchResponse = await this.getLikedTracksByUserToken(accessToken, 0, 50);
    const otherBatches = await requestUtils.iteratePaginatedApiResponse(
      this.axios,
      firstBatchResponse,
      accessToken,
    );
    return [...firstBatchResponse.data.items, ...otherBatches];
  }

  getPlaylistsByUserToken(accessToken, offset = 0, limit = 20) {
    return requestUtils.GET(this.axios, '/me/playlists', accessToken, { offset, limit });
  }

  async getAllPlaylistsByUserToken(accessToken) {
    const firstBatchResponse = await this.getPlaylistsByUserToken(accessToken, 0, 50);
    const otherBatches = await requestUtils.iteratePaginatedApiResponse(
      this.axios,
      firstBatchResponse,
      accessToken,
    );
    return [...firstBatchResponse.data.items, ...otherBatches];
  }
}