import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,  // A coluna role não pode ser nula
    defaultValue: 'client'  // Definindo um valor padrão
  }
}, {
  timestamps: true
});

export default User;
