const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Library extends Model {}

// create fields/columns for Location model
Library.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    books: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
  }
);

module.exports = Library;
