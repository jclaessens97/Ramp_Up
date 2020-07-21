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
    if (trackUris.length > 100) {
      const numberOfChunks = trackUris.length % 100;
      const chunks = chunkArray(trackUris, numberOfChunks);

      let rateLimitHit = false;
      for (let i = 0; i < numberOfChunks; i++) {
        try {
          let currentChunk = [];
          if (rateLimitHit) {
            currentChunk = chunks[i - numberOfChunks];
          } else {
            currentChunk = chunks[i];
          }

          await this.spotifyClient.addTracksToPlaylist(
            accessToken,
            playlistId,
            currentChunk,
          );
        } catch (err) {
          if (!err.response) {
            console.error(err);
            return Promise.reject(
              new Error('Error occured while adding multiple tracks to a playlist.'),
            );
          }

          if (err.response.status === 429) {
            const retryAfterInMs = err.response.headers['Retry-After'] * 1000;
            console.warn(`Hitting rate limit... Waiting ${retryAfterInMs}ms for next request.`);
            await delay(retryAfterInMs);
            rateLimitHit = true;
          }
        }
      }

      return Promise.resolve();
    }

    return this.spotifyClient.addTracksToPlaylist(
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
