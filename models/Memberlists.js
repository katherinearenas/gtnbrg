const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Memberist extends Model {}

Memberist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    club: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    members: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'memberslist'
  }
);

module.exports = Memberist;
