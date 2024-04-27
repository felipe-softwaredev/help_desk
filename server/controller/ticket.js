import Admin from '../models/Admin.js';
import Ticket from '../models/Ticket.js';
import Response from '../models/Response.js';
import { Op } from 'sequelize';

export const getAllTickets = async (req, res, next) => {
  try {
    let allTickets;
    if (req.query.term) {
      allTickets = await Ticket.findAll({
        where: {
          adminId: {
            [Op.iLike]: `%${req.query.term}%`,
          },
        },
        include: { model: Response, as: 'responses' },
      });
    } else {
      allTickets = await Ticket.findAll({
        include: { model: Response, as: 'responses' },
      });
    }

    res.json({ Tickets: allTickets });
  } catch (err) {
    return next(err);
  }
};

export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id, {
      include: [
        {
          model: Admin,
          as: 'admin',
          attributes: { exclude: ['password'] },
        },
        { model: Response, as: 'responses' },
      ],
    });
    return res.json({ Ticket: ticket });
  } catch (err) {
    return next(err);
  }
};

export const createNewTicket = async (req, res, next) => {
  try {
    const newTicket = await Ticket.create(req.body);
    return res.json({ New_Ticket: newTicket });
  } catch (err) {
    return next(err);
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.body.ticketId);
    await ticket.update(req.body);
    return res.json({ Ticket: ticket });
  } catch (err) {
    return next(err);
  }
};

export const deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    await ticket.destroy();
    return res.json({ msg: 'Ticket deleted' });
  } catch (err) {
    return next(err);
  }
};

export const createNewResponse = async (req, res, next) => {
  try {
    const newResponse = await Response.create(req.body);
    return res.json({ New_Response: newResponse });
  } catch (err) {
    return next(err);
  }
};
