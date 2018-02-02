/**
 * Created by laipraserta on 17/1/18.
 */

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  // Register the Babel require hook
  // require('babel-register');
  // require('babel-core/register');
}


module.exports = require('./app');