const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Memberlist extends Model {}

Memberlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    club_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'club',
        key: 'id',
        unique: true
      }
    },
    member_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
      references: {
        model: 'member',
        key: 'id',
        unique: true
      }
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

module.exports = Memberlist;
