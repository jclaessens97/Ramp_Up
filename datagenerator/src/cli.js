#!/usr/bin/env node
import * as json2csv from 'json2csv';
import fs from 'fs';
import path from 'path';
import cliProgress from 'cli-progress';
import SpotifyClient from '../../api/dist/features/spotify/spotifyClient';

const IGNORE_COLUMNS = [
  'type',
  'uri',
  'track_href',
  'analysis_url'
];

function removeRedundantAndAddGenre(track, genre) {
  IGNORE_COLUMNS.forEach((col) => {
    delete track[col];
  })

  return {
    ...track,
    genre,
  }
}

function convertToCsv(data, genre) {
  const columns = [...Object.keys(data[0]), 'genre'].filter((col) => !IGNORE_COLUMNS.includes(col));
  const values = data.map((el) => removeRedundantAndAddGenre(el, genre));
  
  try {
    return json2csv.parse(values, { fields: columns });
  } catch (err) {
    console.error(err);
  }
}

export async function cli(args) {
  const playlistId = args[2];
  const genre = args[3];
  const accessToken = args[4];

  const client = new SpotifyClient();
  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let progressValue = 0;
  progress.start(100, progressValue);
  
  try {
    const tracks = await client.getAllTracksFromPlaylist(accessToken, playlistId);
    progress.update(progressValue += 20);
    
    const audioFeatures = await client.getAudioFeaturesByIds(accessToken, tracks.map(d => d.track.id));
    progress.update(progressValue += 20);

    const csv = convertToCsv(audioFeatures, genre);
    progress.update(progressValue += 20);

    const outputDir = path.join(__dirname, '..', 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    progress.update(progressValue += 20);


    const timestamp = Date.now();
    const filename = path.join(outputDir, `${genre.replace('/', '_')}_${timestamp}.csv`);
    fs.writeFileSync(filename, csv);
    progress.update(progressValue += 20);
    progress.stop();
  } catch (err) {
    progress.stop();

    if (err.response) {
      console.error(err.response.data);
      return;
    }

    console.error(err);
  }
}
