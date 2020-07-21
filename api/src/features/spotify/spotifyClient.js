import requestUtils from '../../helpers/requestUtils';
import { chunkArray } from '../../helpers/arrayUtils';

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

  async getAudioFeaturesByIds(accessToken, ids) {
    const numberOfChunks = Math.ceil(ids.length) / 100;
    const chunkSize = ids.length / numberOfChunks;
    const chunks = chunkArray(ids, chunkSize);

    const features = [];
    for (let i = 0; i < numberOfChunks; i++) {
      const chunk = chunks[i];
      const audioFeaturesResponse = await requestUtils.GET(
        this.axios,
        '/audio-features',
        accessToken,
        { ids: chunk.join(',') },
      );

      features.push(...audioFeaturesResponse.data.audio_features);
    }

    return [...features];
  }

  async createPlaylist(accessToken, userId, name, publicVisible = false, description = '') {
    const playlist = await requestUtils.POST(
      this.axios,
      `/users/${userId}/playlists`,
      {
        name,
        public: publicVisible,
        description,
      },
      accessToken,
    );
    return playlist.data;
  }

  async addTracksToPlaylist(accessToken, playlistId, trackUris) {
    return requestUtils.POST(
      this.axios,
      `/playlists/${playlistId}/tracks`,
      { uris: trackUris },
      accessToken,
    );
  }

  async getTracksFromPlaylist(accessToken, playlistId, offset = 0, limit = 100) {
    return requestUtils.GET(
      this.axios,
      `/playlists/${playlistId}/tracks`,
      accessToken,
      { offset, limit },
    );
  }

  async getAllTracksFromPlaylist(accessToken, playlistId) {
    const firstBatchResponse = await this.getTracksFromPlaylist(accessToken, playlistId, 0, 5);
    const otherBatches = await requestUtils.iteratePaginatedApiResponse(
      this.axios,
      firstBatchResponse,
      accessToken,
    );
    return [...firstBatchResponse.data.items, ...otherBatches];
  }
}
