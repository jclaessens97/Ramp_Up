import { getBearerTokenFromHeader } from '../../helpers/authUtils';

export default class TrackController {
  constructor({ trackService }) {
    this.trackService = trackService;
  }

  async getAllLikedTracksByUserToken(ctx) {
    await this.trackService.getAllLikedTracksByUserToken(
      getBearerTokenFromHeader(ctx.header.authorization),
    );
    ctx.status = 200;
  }

  async getAudioFeaturesByIds(ctx) {
    await this.trackService.getAudioFeaturesByIds(
      getBearerTokenFromHeader(ctx.header.authorization),
      ['0tGPJ0bkWOUmH7MEOR77qc', '0tGPJ0bkWOUmH7MEOR77qc'],
    );
    ctx.status = 200;
  }
}
