const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Member extends Model { }

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [50, 255]
      }
    },
    collection: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },


    memberships: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'member'
  }
);

module.exports = Member;
