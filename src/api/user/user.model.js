/**
 * Created by laipraserta on 24/1/18.
 */

const crypto = require('crypto');

let validatePresenceOf = function (value) {
  return value && value.length;
};

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    provider: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {

    //Virtual Getters
    getterMethods: {
      //Public profile information
      profile() {
        return {
          fname: this.fname,
          lname: this.lname,
          role: this.role
        };
      },

      //Non-sensitive info, put in the token
      token() {
        return {
          _id: this._id,
          role: this.role
        }
      }
    },

    //Pre-save hooks
    hooks: {
      beforeBulkCreate(users, fields, fn) {
        let totalUpdate = 0;
        users.forEach(user => {
          user.updatePassword(err => {
            if(err) return fn(err);
            totalUpdate += 1;
            if(totalUpdate === users.length) return fn();
          });
        });
      },
      beforeCreate(user, fields, fn) {
        user.updatePassword(fn);
      },
      beforeUpdate(user, fields, fn) {
        if(user.changed('password')) return user.updatePassword(fn);
        fn();
      }
    },

    //Instance Methods
    instanceMethods: {

      //Encrypt password
      encryptPassword(pwd, cb) {
        if(!pwd || !this.salt) {
          return cb ? cb(null) : null;
        }

        let defaultIterations = 10000;
        let defaultKeyLength = 64;
        let salt = new Buffer(this.salt, 'base64');

        if(!cb) {
          return crypto.pbkdf2Sync(pwd, salt, defaultIterations, defaultKeyLength).toString('base64');
        }

        return crypto.pbkdf2(pwd, salt, defaultIterations, defaultKeyLength, (err, key) => {
          if(err) return cb(err);
          return cb(null, key.toString('base64'));
        });
      },


      //Make salt
      makeSalt(...args) {
        let byteSize;
        let cb;
        let defaultBySize = 16;

        if(typeof args[0] === 'function') {
          cb = args[0];
          byteSize = defaultBySize;
        }else if(typeof args[1] === 'function') {
          cb = args[1];
        }else {
          throw new Error('Missing callback');
        }

        if(!byteSize) {
          byteSize = defaultBySize;
        }

        return crypto.randomBytes(byteSize, (err, salt) => {
          if(err) return cb(err);
          return cb(null, salt.toString('base64'));
        });
      },

      //Handle new/update password
      updatePassword(fn) {
        if(!this.password) {
          return fn(null);
        }

        if(!validatePresenceOf(this.password)) {
          fn(new Error('Invalid password'));
        }

        //Make salt with callback
        this.makeSalt((saltErr, salt) => {
          if(saltErr) return fn(saltErr);
          this.salt = salt;
          this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
            if(encryptErr) fn(encryptErr);
            this.password = hashedPassword;
            fn(null);
          });
        });

      }
    }
  });
};