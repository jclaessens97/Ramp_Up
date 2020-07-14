export default class TrackService {
  constructor({ spotifyClient }) {
    this.spotifyClient = spotifyClient;
  }

  async getAllLikedTracksByUserToken(accessToken) {
    const allLikedTracks = await this.spotifyClient.getAllLikedTracksByUserToken(accessToken);
    console.log(`${allLikedTracks.length} liked tracks found.`);
    return allLikedTracks;
  }

  async getAudioFeaturesByIds(accessToken, ids) {
    const audioFeatures = await this.spotifyClient.getAudioFeaturesByIds(accessToken, ids);
    console.log(audioFeatures);
    return audioFeatures;
  }
}
