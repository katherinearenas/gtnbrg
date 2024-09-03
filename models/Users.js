const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class User extends Model {}

// create fields/columns for Trip model
User.init(
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
      allowNull: true
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
        isAlphanumeric: true,
        len: [8, 50]
      }
    },
    library: {
      type: DataTypes.INTEGER,

      allowNull: true,
      references: {
        model: 'Library',
        key: 'id',
        unique: false
      }
    },


    membership: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Memberlist',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
