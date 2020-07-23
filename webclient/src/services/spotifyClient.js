import requestUtils from '../helpers/requestUtils';
import { chunkArray } from '../helpers/arrayUtils';

export default class SpotifyClient {
  constructor(accessToken) {
    this.axios = requestUtils.createAxiosInstance('https://api.spotify.com/v1');
    this.axios.defaults.headers.common['Authorization'] = accessToken;
  }

  getLikedTracksByUserToken(offset = 0, limit = 20) {
    return requestUtils.GET(this.axios, '/me/tracks', { offset, limit });
  }

  async getAllLikedTracksByUserToken() {
    const firstBatchResponse = await this.getLikedTracksByUserToken(0, 50);
    const otherBatches = await requestUtils.iteratePaginatedApiResponse(
      this.axios,
      firstBatchResponse,
    );
    return [...firstBatchResponse.data.items, ...otherBatches];
  }

  getPlaylistsByUserToken(offset = 0, limit = 20) {
    return requestUtils.GET(this.axios, '/me/playlists', { offset, limit });
  }

  async getAllPlaylistsByUserToken() {
    const firstBatchResponse = await this.getPlaylistsByUserToken(0, 50);
    const otherBatches = await requestUtils.iteratePaginatedApiResponse(
      this.axios,
      firstBatchResponse,
    );
    return [...firstBatchResponse.data.items, ...otherBatches];
  }

  async getAudioFeaturesByIds(ids) {
    const chunks = chunkArray(ids, 100);

    const features = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const audioFeaturesResponse = await requestUtils.GET(
        this.axios,
        '/audio-features',
        { ids: chunk.join(',') },
      );

      features.push(...audioFeaturesResponse.data.audio_features);
    }

    return [...features];
  }

  async createPlaylist(userId, name, publicVisible = false, description = '') {
    const playlist = await requestUtils.POST(
      this.axios,
      `/users/${userId}/playlists`,
      {
        name,
        public: publicVisible,
        description,
      },
    );
    return playlist.data;
  }

  async addTracksToPlaylist(playlistId, trackUris) {
    const chunks = chunkArray(trackUris, 100);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      await requestUtils.POST(
        this.axios,
        `/playlists/${playlistId}/tracks`,
        { uris: chunk },
      );
    }

    return Promise.resolve();
  }

  async getTracksFromPlaylist(playlistId, offset = 0, limit = 100) {
    return requestUtils.GET(
      this.axios,
      `/playlists/${playlistId}/tracks`,
      { offset, limit },
    );
  }

  async getAllTracksFromPlaylist(playlistId) {
    const firstBatchResponse = await this.getTracksFromPlaylist(playlistId, 0, 5);
    const otherBatches = await requestUtils.iteratePaginatedApiResponse(
      this.axios,
      firstBatchResponse,
    );
    return [...firstBatchResponse.data.items, ...otherBatches];
  }
}
