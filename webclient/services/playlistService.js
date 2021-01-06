import {
  loadGenreModel,
} from '~/utils/modelUtils';
import {
  getGenreFromTrack,
} from '~/services/trackService';
import {
  createPlaylist,
  addTracksToPlaylist,
} from '~/services/spotifyClient';

function initPlaylistsPerGenre(genres) {
  const playlists = {};
  genres.forEach((genre) => {
    playlists[genre] = [];
  });
  return playlists;
}

function generateRandomPlaylistName(genre) {
  return `${genre}_${Math.random().toString(36).substring(7)}`;
}

export async function generatePlaylists(likedSongs, options) {
  const model = await loadGenreModel();
  const playlists = initPlaylistsPerGenre(options.genres);

  likedSongs.forEach((song) => {
    const genre = getGenreFromTrack(model, song);

    if (genre in playlists) {
      playlists[genre].push(song);
    }
  });

  return playlists;
}

export async function createPlaylistsOnSpotify(ctx, userId, playlists) {
  const createSpotifyPlaylistPromises = [];

  // TODO: improve
  Object.keys(playlists).forEach((k) => {
    createSpotifyPlaylistPromises.push(
      createPlaylist(
        ctx,
        userId,
        generateRandomPlaylistName(k),
      ),
    );
  });

  const createdPlaylists = await Promise.all(createSpotifyPlaylistPromises);

  const addTracksToPlaylistPromises = [];
  let index = 0;
  createdPlaylists.forEach((playlist) => {
    addTracksToPlaylistPromises.push(
      addTracksToPlaylist(
        ctx,
        playlist.id,
        Object.values(playlists)[index].map((track) => track.uri),
      ),
    );

    index += 1;
  });
}

export default {
  generatePlaylists,
  createPlaylistsOnSpotify,
  addTracksToPlaylist,
};
