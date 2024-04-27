import express from 'express';
import { getAllAdmins, getAdmin } from '../controller/admin.js';

import { authenticateJWT } from '../middleware/authentication.js';

const router = express.Router();

router.get('/', authenticateJWT, getAllAdmins);

router.get('/:id', authenticateJWT, getAdmin);

export default router;
