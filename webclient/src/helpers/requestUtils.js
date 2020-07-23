import axios from 'axios';
import { delay } from './promiseUtils';

function GET(axiosInstance, url = null, params = null) {
  const opts = {};

  if (params) {
    opts.params = params;
  }

  return axiosInstance.get(url, opts);
}

function POST(axiosInstance, url, body, params = null) {
  const opts = {};

  if (params) {
    opts.params = params;
  }

  return axiosInstance.post(url, body, opts);
}

function createAxiosInstance(baseURL) {
  return axios.create({
    baseURL,
  });
}

async function iteratePaginatedApiResponse(axiosInstance, response) {
  const items = [];

  let responseData = response.data;
  do {
    try {
      responseData = (await GET(axiosInstance, responseData.next)).data;
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
  createAxiosInstance,
};
