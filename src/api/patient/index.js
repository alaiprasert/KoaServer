/**
 * Created by laipraserta on 17/1/18.
 */

const Router = require('koa-router');
const router = new Router({prefix: '/api/patients'});
// const controller = require('./patient.controller');
const Patient = require('./patient.model');


router.get('/', async (ctx, next) => {
  ctx.body = 'hello from patient';
});

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'post done';
});



// router.get('/', (ctx, next) => {
//   ctx.body = controller.showAll;
//   // ctx.body = 'hello from patient';
//   // controller.show();
// });

// router.get('/', controller.showAll);

module.exports = router;
