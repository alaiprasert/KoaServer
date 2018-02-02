
const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello from router';
});

module.exports = router;
