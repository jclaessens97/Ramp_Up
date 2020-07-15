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

  async createPlaylist(ctx) {
    await this.playlistService.createPlaylist(
      getBearerTokenFromHeader(ctx.header.authorization),
      '',
      'Test playlist',
    );
    ctx.status = 201;
  }

  async addTracksToPlaylist(ctx) {
    await this.playlistService.addTracksToPlaylist(
      getBearerTokenFromHeader(ctx.header.authorization),
      '3Em8a0BBkwvjuNOkFdwE2y',
      ['spotify:track:78XfOXpUShe7mFwhjBEd94', 'spotify:track:55CZrhOjk8eGiv5LHV8yvG'],
    );
    ctx.status = 201;
  }
}
