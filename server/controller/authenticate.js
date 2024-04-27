import Admin from '../models/Admin.js';
import { createToken } from '../helpers/jwtToken.js';
import { UnauthorizedError } from '../helpers/expressError.js';

export const login = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.body.username);
    const response = await admin.authenticate(
      req.body.password,
      admin.password
    );
    if (response) {
      const token = createToken(admin);
      res.cookie('Admin', [admin.username, token]);
      return res.json({ admin: admin.username, token: token });
    } else {
      throw new UnauthorizedError('Wrong username/password');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const newAdmin = await Admin.create(req.body);
    return res.json({
      Admin_Created: newAdmin,
    });
  } catch (err) {
    return next(err);
  }
};
