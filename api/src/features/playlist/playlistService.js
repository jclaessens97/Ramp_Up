import { chunkArray } from '../../helpers/arrayUtils';
import { delay } from '../../helpers/promiseUtils';

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

  async addTracksToPlaylist(accessToken, playlistId, trackUris) {
    await this.spotifyClient.addTracksToPlaylist(
      accessToken,
      playlistId,
      trackUris,
    );
  }

  async getAllTracksFromPlaylist(accessToken, playlistId) {
    const tracks = await this.spotifyClient.getAllTracksFromPlaylist(
      accessToken,
      playlistId,
    );

    console.log(tracks.length);
    return tracks;
  }
}
