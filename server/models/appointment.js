import { sequelize } from '../database/db.js';
import { DataTypes } from 'sequelize';
import Service from './service.js'; // Importando Service corretamente
import Barber from './barber.js';   // Importando Barber com o default

// Definindo o modelo Appointment
const Appointment = sequelize.define('Appointment', {
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  barber_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'scheduled',  // Status inicial como "scheduled"
  },
});

// Relacionamentos
Appointment.belongsTo(Service, { foreignKey: 'service_id' });
Appointment.belongsTo(Barber, { foreignKey: 'barber_id' });

// Exportando o modelo Appointment
export default Appointment;
