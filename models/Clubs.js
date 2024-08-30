const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Traveller model
class Club extends Model {}

// create fields/columns for Traveller model
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: 'member',
        key: 'id',
        unique: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    book_list: {
      type: DataTypes.STRING,
      allowNull: true
      //add book connection
    },
    member_list: {
      type: DataTypes.STRING,
      allowNull: true
      //add member connection
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'traveller'
  }
);

module.exports = Club;
