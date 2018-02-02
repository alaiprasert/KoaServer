/**
 * Created by laipraserta on 17/1/18.
 */

const _ = require('lodash');

//All configurations will extend these options
const all = {
  // env: process.env.NODE_ENV,

  // root: path.normalize(`${__dirname}/../../..`),


};

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {});