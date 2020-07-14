import KoaRouter from 'koa-router';
import trackRouter from './features/track/trackRouter';
import playlistRouter from './features/playlist/playlistRouter';

const router = new KoaRouter();

router.prefix('/api');
router.use('/track', trackRouter.routes());
router.use('/playlist', playlistRouter.routes());

export default router;
