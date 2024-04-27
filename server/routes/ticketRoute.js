import express from 'express';
import { authenticateJWT } from '../middleware/authentication.js';
import {
  createNewTicket,
  getTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
  createNewResponse,
} from '../controller/ticket.js';

const router = express.Router();

router.get('/', authenticateJWT, getAllTickets);

router.get('/:id', authenticateJWT, getTicket);

router.post('/new-ticket', createNewTicket);

router.post('/new-response', authenticateJWT, createNewResponse);

router.patch('/new-ticket', authenticateJWT, updateTicket);

export default router;
