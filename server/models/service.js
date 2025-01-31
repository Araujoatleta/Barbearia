// models/service.js
import { sequelize } from '../database/db.js';
import { DataTypes } from 'sequelize';

const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  points_earned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Service;
