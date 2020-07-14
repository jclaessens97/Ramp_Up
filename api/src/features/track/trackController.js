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
}
