/**
 * Created by laipraserta on 17/1/18.
 */


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    status: DataTypes.STRING,
    title: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    country: DataTypes.STRING,
    language: DataTypes.STRING,
    side: DataTypes.STRING,
    protocol: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
