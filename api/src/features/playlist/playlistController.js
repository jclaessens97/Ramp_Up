import { getBearerTokenFromHeader } from '../../helpers/authUtils';

export default class TrackController {
  constructor({ playlistService }) {
    this.playlistService = playlistService;
  }

  async getAllPlaylistsByUserToken(ctx) {
    await this.playlistService.getAllPlaylistsByUserToken(
      getBearerTokenFromHeader(ctx.header.authorization),
    );
    ctx.status = 200;
  }
}
