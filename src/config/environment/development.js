/**
 * Created by laipraserta on 17/1/18.
 */

const config = {
  sequelize: {
    dbname: process.env.PORTGRES_URL || 'test',
    username: 'admin',
    password: 'admin',
    options: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      define: {
        timestamps: false
      }
    }
  },

};

module.exports = config;