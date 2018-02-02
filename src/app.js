/**
 * Created by laipraserta on 17/1/18.
 */

const koa = require('koa');
const app =  new koa();

const port = process.env.PORT || 3000;
// const options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
// };

const sqldb = require('./sqldb/index');

require('./routes')(app);
// const router = require('./routes');
// app.use(router);

function startServer(){
  app.listen(port);
  // https.createServer(app.callback()).listen(443);
  console.log('Koa listening on ', port);
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(err => {
    console.log('ERROR!!! can not start server', err);
  });

exports = module.exports = app;
