/**
 * Created by laipraserta on 17/1/18.
 */


const Router = require('koa-router');
const router = new Router({prefix: '/api/users'});

router.get('/', async (ctx, next) => {
  ctx.body = 'hello from user';
});

module.exports = router;
