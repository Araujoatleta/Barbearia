import { sequelize } from '../database/db.js';  // Importando a instância do Sequelize
import User from './User.js';
import Appointment from './appointment.js';
import Service from './service.js';
import Barber from './barber.js';
import LoyaltyPoint from './loyaltyPoint.js';

// Relacionamentos (associações) entre os modelos
User.hasMany(Appointment, { foreignKey: 'client_id' });
Appointment.belongsTo(User, { foreignKey: 'client_id' });

Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

Barber.hasMany(Appointment, { foreignKey: 'barber_id' });
Appointment.belongsTo(Barber, { foreignKey: 'barber_id' });

export { sequelize, User, Appointment, Service, Barber, LoyaltyPoint };
