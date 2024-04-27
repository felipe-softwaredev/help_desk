import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import Admin from './Admin.js';

const Ticket = sequelize.define('ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    valide: { isEmail: true },
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NEW',
  },
});

Admin.hasMany(Ticket, {
  as: 'tickets',
  foreignKey: 'adminId',
});
Ticket.belongsTo(Admin, {
  as: 'admin',
  foreignKey: 'adminId',
});

export default Ticket;
