import axios from 'axios';
import querystring from 'querystring';
import { delay } from '../../helpers/promiseUtils';

export default class SpotifyClient {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.spotify.com/v1',
    });
  }

  // TODO: move to requestUtils
  get(accessToken, url) {
    return this.axios.get(url, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getUsersLikedTracks(accessToken, offset = 0, limit = 50) {
    return this.axios.get('/me/tracks', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: querystring.stringify({
        offset,
        limit,
      }),
    });
  }

  async getAllUsersLikedTracks(accessToken) {
    const allLikedTracks = [];
    const firstBatchResponse = await this.getUsersLikedTracks(accessToken, 0, 50);
    allLikedTracks.push(...firstBatchResponse.data.items);

    let response = firstBatchResponse.data;
    do {
      try {
        response = (await this.get(accessToken, response.next)).data;
        allLikedTracks.push(...response.items);
      } catch (err) {
        if (!err.response) {
          console.error(err);
          return Promise.reject(new Error('Error occured while fetching allLikedSongs'));
        }

        if (err.response.status === 429) {
          const retryAfterInMs = err.response.headers['Retry-After'] * 1000;
          console.warn(`Hitting rate limit... Waiting ${retryAfterInMs}ms for next request.`);
          await delay(retryAfterInMs);
        }
      }
    } while (response.next);

    return allLikedTracks;
}
