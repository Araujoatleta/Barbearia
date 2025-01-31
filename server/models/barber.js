import { sequelize } from '../database/db.js';
import { DataTypes } from 'sequelize';

// Definindo o modelo Barber
const Barber = sequelize.define('Barber', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Adicione outros campos necessários para o modelo Barber
});

// Exportando o modelo Barber
export default Barber; // Use export default para a exportação
