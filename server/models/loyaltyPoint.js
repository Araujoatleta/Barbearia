// models/loyaltyPoint.js
import { sequelize } from '../database/db.js';
import { DataTypes } from 'sequelize';

const LoyaltyPoint = sequelize.define('LoyaltyPoint', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default LoyaltyPoint;
