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

function transformPlaylistObject(playlistObj) {
  const playlists = [];

  Object.keys(playlistObj).forEach((genre) => {
    playlists.push({
      name: generateRandomPlaylistName(genre),
      genre,
      tracks: playlistObj[genre],
    });
  });

  return playlists;
}

export async function generatePlaylists(likedSongs, options) {
  const model = await loadGenreModel();
  const playlists = initPlaylistsPerGenre(options.genres);

  likedSongs.forEach((song) => {
    const track = song;
    const genre = getGenreFromTrack(model, track);
    track.genre = genre;

    if (genre.name in playlists) {
      playlists[genre.name].push(track);
    }
  });

  return transformPlaylistObject(playlists);
}

export async function createPlaylistsOnSpotify(ctx, userId, playlists) {
  const createSpotifyPlaylistPromises = [];
  console.log(playlists);

  playlists.forEach((p) => {
    createSpotifyPlaylistPromises.push(
      createPlaylist(
        ctx,
        userId,
        p.name,
      ),
    );
  });

  const createdPlaylists = await Promise.all(createSpotifyPlaylistPromises);

  const addTracksToPlaylistPromises = [];
  createdPlaylists.forEach((playlist) => {
    const myPlaylist = playlists.find((p) => p.name === playlist.name);

    addTracksToPlaylistPromises.push(
      addTracksToPlaylist(
        ctx,
        playlist.id,
        myPlaylist.tracks.map((track) => track.uri),
      ),
    );
  });
}

export default {
  generatePlaylists,
  createPlaylistsOnSpotify,
  addTracksToPlaylist,
};
