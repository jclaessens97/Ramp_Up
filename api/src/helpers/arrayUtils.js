export function chunkArray(arr, numberOfChunks) {
  let tmpArr = [];

  for (let i = 0, j = arr.length; i < j; i += numberOfChunks) {
    tmpArr = arr.slice(i, i + numberOfChunks);
  }

  return tmpArr;
}

export default {
  chunkArray,
};
