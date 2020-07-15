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

  async getAudioFeaturesByIds(accessToken, ids) {
    const audioFeaturesResponse = await requestUtils.GET(
      this.axios,
      '/audio-features',
      accessToken,
      { ids: ids.join(',') },
    );

    return audioFeaturesResponse.data.audio_features;
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
}
