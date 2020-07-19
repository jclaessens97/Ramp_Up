import { getBearerTokenFromHeader } from '../../helpers/authUtils';
import { writeToFile } from '../../helpers/fileUtils';

export default class TrackController {
  constructor({ trackService }) {
    this.trackService = trackService;
  }

  async getAllLikedTracksByUserToken(ctx) {
    const likedTracks = await this.trackService.getAllLikedTracksByUserToken(
      getBearerTokenFromHeader(ctx.header.authorization),
    );

    const lines = likedTracks.map((liked) => {
      const { id, uri, name } = liked.track;
      return `${id},${uri},${name}\n`;
    });

    await writeToFile('liked.txt', lines);

    ctx.status = 200;
  }

  async getAudioFeaturesByIds(ctx) {
    const audioFeatures = await this.trackService.getAudioFeaturesByIds(
      getBearerTokenFromHeader(ctx.header.authorization),
      [
        '63ANvDI7YAyD6BzCpMGkOH', // Boef - nooit thuis
        '25w9EAbgKDa7XSSC7MYXKk', // Boef - Treinstation
        '2c8sgbZoEanC3QyFNZxUcA', // Logic - Flexicution
        '6Qng1hawspj0ddyexe0IHV', // Deadmau5 - Polaris
        '7hEWF5fGra9cm2YYpCClMQ', // Audiotricz - Renegade
      ],
    );

    await writeToFile('features.txt', JSON.stringify(audioFeatures, 0, 2));

    ctx.status = 200;
  }
}
