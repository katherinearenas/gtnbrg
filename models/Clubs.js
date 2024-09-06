const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Club extends Model {}

Club.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    host: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'member',
        key: 'id',
        unique: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'club'
  }
);

module.exports = Club;
