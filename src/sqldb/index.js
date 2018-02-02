/**
 * Created by laipraserta on 17/1/18.
 */

const config = require('../config/environment');
const Sequelize = require('sequelize');

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.dbname, config.sequelize.username, config.sequelize.password, config.sequelize.options)
};

db.User = db.sequelize.import('../api/user/user.model');
db.Patient = db.sequelize.import('../api/patient/patient.model');

module.exports = db;