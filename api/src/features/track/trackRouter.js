import KoaRouter from 'koa-router';
import { makeInvoker } from 'awilix-koa';
import trackController from './trackController';

const router = new KoaRouter();
const trackAPI = makeInvoker(trackController);

router.get('/liked/user', trackAPI('getAllUsersLikedTracks'));

export default router;
