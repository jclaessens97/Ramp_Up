export default class TrackService {
  constructor({ spotifyClient }) {
    this.spotifyClient = spotifyClient;
  }

  async getAllLikedTracksByUserToken(accessToken) {
    const allLikedTracks = await this.spotifyClient.getAllLikedTracksByUserToken(accessToken);
    console.log(`${allLikedTracks.length} liked tracks found.`);
    return allLikedTracks;
  }
}
