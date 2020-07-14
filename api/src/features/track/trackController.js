import { getBearerTokenFromHeader } from '../../helpers/authUtils';

export default class TrackController {
  constructor({ trackService }) {
    this.trackService = trackService;
  }

  async getAllUsersLikedTracks(ctx) {
    await this.trackService.getAllUsersLikedTracks(
      getBearerTokenFromHeader(ctx.header.authorization),
    );
    ctx.status = 200;
  }
}
