import KoaRouter from 'koa-router';
import trackRouter from './features/track/trackRouter';

const router = new KoaRouter();

router.prefix('/api');
router.use('/track', trackRouter.routes());

export default router;
