import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import Ticket from './Ticket.js';

const Response = sequelize.define('response', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
  },
});

Ticket.hasMany(Response, { foreignKey: 'ticketId', as: 'responses' });
Response.belongsTo(Ticket, {
  foreignKey: 'ticketId',
});

export default Response;
