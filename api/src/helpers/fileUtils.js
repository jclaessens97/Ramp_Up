import fs from 'fs';
import path from 'path';

export function writeToFile(filename, data) {
  const target = path.join(__dirname, '..', 'debug');

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(`${target}/${filename}`, data, 'ascii', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export default {
  writeToFile,
};
