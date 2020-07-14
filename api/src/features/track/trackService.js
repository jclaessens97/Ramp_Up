export default class TrackService {
  constructor({ spotifyClient }) {
    this.spotifyClient = spotifyClient;
  }

  async getAllUsersLikedTracks(accessToken) {
    const allLikedTracks = await this.spotifyClient.getAllUsersLikedTracks(accessToken);
    console.log(`${allLikedTracks.length} liked tracks found.`);
    return allLikedTracks;
  }
}
