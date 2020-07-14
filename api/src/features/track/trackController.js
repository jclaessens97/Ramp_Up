export default class TrackController {
  constructor({ trackService }) {
    this.trackService = trackService;
  }

  getTest(ctx) {
    ctx.body = this.trackService.test();
  }
}
