import KoaRouter from 'koa-router';
import { makeInvoker } from 'awilix-koa';
import playlistController from './playlistController';

const router = new KoaRouter();
const playlistAPI = makeInvoker(playlistController);

router.get('/user', playlistAPI('getAllPlaylistsByUserToken'));

export default router;
