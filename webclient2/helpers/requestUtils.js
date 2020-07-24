import { delay } from './promiseUtils';

function GET(axios, url = null, params = null) {
  const opts = {};

  if (params) {
    opts.params = params;
  }

  return axios.get(url, opts);
}

function POST(axios, url, body, params = null) {
  const opts = {};

  if (params) {
    opts.params = params;
  }

  return axios.post(url, body, opts);
}

async function iteratePaginatedApiResponse(axios, response) {
  const items = [];

  let responseData = response.data;
  do {
    try {
      responseData = (await GET(axios, responseData.next)).data;
      items.push(...responseData.items);
    } catch (err) {
      if (!err.response) {
        console.error(err);
        return Promise.reject(
          new Error('Error occured while looping through paginated api.'),
        );
      }

      if (err.response.status === 429) {
        const retryAfterInMs = err.response.headers['Retry-After'] * 1000;
        console.warn(`Hitting rate limit... Waiting ${retryAfterInMs}ms for next request.`);
        await delay(retryAfterInMs);
      }
    }
  } while (responseData.next);

  return items;
}

export default {
  GET,
  POST,
  iteratePaginatedApiResponse,
};
