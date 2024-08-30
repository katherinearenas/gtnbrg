const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class Member extends Model {}

// create fields/columns for Trip model
Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.VARCHAR(50),
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
      type: DataTypes.VARCHAR(50),
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [8, 50]
      }
    },
    library: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
        unique: false
      }
    },
    clubs_list: {
      type: DataTypes.INTEGER,
      references: {
        model: 'club',
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
    modelName: 'trip'
  }
);

module.exports = Member;
