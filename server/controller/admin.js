import Admin from '../models/Admin.js';
import Ticket from '../models/Ticket.js';

export const getAllAdmins = async (req, res, next) => {
  try {
    const allAdmin = await Admin.findAll({
      attributes: { exclude: ['password'] },
    });
    res.send({ All_Admin: allAdmin });
  } catch (err) {
    return next(err);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: {
        model: Ticket,
        as: 'tickets',
      },
    });
    return res.json({ Admin: admin });
  } catch (err) {
    return next(err);
  }
};
