import { DataTypes } from 'sequelize';
import { sequelize, BCRYPT_WORK_FACTOR } from '../config/config.js';
import bcrypt from 'bcrypt';

const Admin = sequelize.define(
  'admin',
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) {
          admin.password = await bcrypt.hash(
            admin.password,
            BCRYPT_WORK_FACTOR
          );
        }
      },
    },
  }
);
Admin.prototype.authenticate = async (pwd, userpassword) => {
  return await bcrypt.compare(pwd, userpassword);
};

export default Admin;
