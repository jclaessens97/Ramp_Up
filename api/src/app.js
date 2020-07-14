import Koa from 'koa';
import { scopePerRequest } from 'awilix-koa';
import router from './router';
import configureContainer from './configureContainer';

const app = new Koa();
const container = configureContainer();

app.use(scopePerRequest(container));
app.use(router.routes()).use(router.allowedMethods());

export default app;
