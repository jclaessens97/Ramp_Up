import { en } from 'vuetify/es5/locale';

export default {
  ...en,
  hi: 'Hi',
  startHere: 'start here',

  playlistOverview: {
    name: 'Name',
    playlistOverview: 'Playlist Overview',
    public: 'Public',
    showOnlyGenerated: 'Show only generated playlists',
    tracks: 'Tracks',
    viewOnSpotify: 'View on Spotify',
  },

  generatePlaylistDialog: {
    all: 'all',
    cancel: 'cancel',
    generate: 'generate',
    generatorSettings: 'Generator Settings',
    genres: 'genres',
    additionalSettings: 'Additional Settings',
  },

  generator: {
    fetchingLikedTracks: 'Fetching liked tracks',
    fetchedLikedTracks: 'Fetched liked tracks',
    failedFetchingLikedTracks: 'Failed to fetch liked tracks',
    fetchingAudioFeatures: 'Fetching audio features',
    fetchedAudioFeatures: 'Fetched audio features',
    failedFetchingAudioFeatures: 'Failed to fetch audio features',
    generatingPlaylists: 'Generating playlists',
    generatedPlaylists: 'Generated playlists',
    failedGeneratingPlaylists: 'Failed to generate playlists',
    creatingPlaylistsSpotify: 'Creating playlists on Spotify',
    createdPlaylistsSpotify: 'Created playlists on Spotify',
    failedCreatingPlaylists: 'Failed to create playlists on Spotify',
  },
};
