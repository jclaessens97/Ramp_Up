export default class TrackService {
  constructor({ spotifyClient }) {
    this.spotifyClient = spotifyClient;
  }

  async getAllPlaylistsByUserToken(accessToken) {
    const allPlaylists = await this.spotifyClient.getAllPlaylistsByUserToken(accessToken);
    console.log(`${allPlaylists.length} playlists found.`);
    return allPlaylists;
  }

  async createPlaylist(accessToken, userId, name) {
    const playlist = await this.spotifyClient.createPlaylist(
      accessToken,
      userId,
      name,
    );
    return playlist;
  }
}
