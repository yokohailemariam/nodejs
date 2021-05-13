'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Patients.init({
    firstname: DataTypes.STRING,
    secondname: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    city: DataTypes.STRING,
    subcity: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patients',
  });
  return Patients;
};