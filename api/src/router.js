import KoaRouter from 'koa-router';
import trackRouter from './features/track/trackRouter';

const router = new KoaRouter();

router.use('/test', trackRouter.routes());

export default router;
