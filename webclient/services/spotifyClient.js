import requestUtils from '~/helpers/requestUtils';
import { chunkArray } from '~/helpers/arrayUtils';

function getLikedTracksByUserToken(axios, offset = 0, limit = 20) {
  return requestUtils.GET(axios, '/me/tracks', { offset, limit });
}

export async function getAllLikedTracksByUserToken(ctx) {
  const firstBatchResponse = await getLikedTracksByUserToken(ctx.$axios, 0, 50);
  const otherBatches = await requestUtils.iteratePaginatedApiResponse(
    ctx.$axios,
    firstBatchResponse,
  );
  return [...firstBatchResponse.data.items, ...otherBatches];
}

function getPlaylistsByUserToken(axios, offset = 0, limit = 20) {
  return requestUtils.GET(axios, '/me/playlists', { offset, limit });
}

export async function getAllPlaylistsByUserToken(ctx) {
  const firstBatchResponse = await getPlaylistsByUserToken(ctx.$axios, 0, 50);
  const otherBatches = await requestUtils.iteratePaginatedApiResponse(
    ctx.$axios,
    firstBatchResponse,
  );
  return [...firstBatchResponse.data.items, ...otherBatches];
}

export async function getAudioFeaturesByIds(ctx, ids) {
  const chunks = chunkArray(ids, 100);
  console.log(chunks);

  const features = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const audioFeaturesResponse = await requestUtils.GET(
      ctx.$axios,
      '/audio-features',
      { ids: chunk.join(',') },
    );

    features.push(...audioFeaturesResponse.data.audio_features);
  }

  return [...features];
}

export async function createPlaylist(ctx, userId, name, description = '', publicVisible = false, collaborative = false) {
  const playlist = await requestUtils.POST(
    ctx.$axios,
    `/users/${userId}/playlists`,
    {
      name,
      public: publicVisible,
      description,
      collaborative,
    },
  );
  return playlist.data;
}

export async function addTracksToPlaylist(ctx, playlistId, trackUris) {
  const chunks = chunkArray(trackUris, 100);
  console.log(chunks);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    await requestUtils.POST(
      ctx.$axios,
      `/playlists/${playlistId}/tracks`,
      { uris: chunk },
    );
  }

  return Promise.resolve();
}

// async function getTracksFromPlaylist(playlistId, offset = 0, limit = 100) {
//   return requestUtils.GET(
//     this.axios,
//     `/playlists/${playlistId}/tracks`,
//     { offset, limit },
//   );
// }

// async function getAllTracksFromPlaylist(playlistId) {
//   const firstBatchResponse = await this.getTracksFromPlaylist(playlistId, 0, 5);
//   const otherBatches = await requestUtils.iteratePaginatedApiResponse(
//     this.axios,
//     firstBatchResponse,
//   );
//   return [...firstBatchResponse.data.items, ...otherBatches];
// }

export default {
  getAllPlaylistsByUserToken,
};
