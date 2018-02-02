/**
 * Created by laipraserta on 17/1/18.
 */


const routers = function (app) {
  app
    .use(require('./api/user/index').routes())
    .use(require('./api/user/index').allowedMethods())
    .use(require('./api/patient/index').routes())
    .use(require('./api/patient/index').allowedMethods())
    .use(require('./route/default').routes())
    .use(require('./route/default').allowedMethods());
};

module.exports = routers;
