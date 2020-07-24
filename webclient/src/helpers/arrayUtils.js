/**
 * Splits array into parts with max n items per part.
 * @param {*} arr array to divide in chunks
 * @param {*} n max number of items in one chunk
 */
export function chunkArray(arr, n) {
  const numberOfChunks = Math.ceil(arr.length) / n;
  const chunkSize = arr.length / numberOfChunks;

  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

export default {
  chunkArray,
};
