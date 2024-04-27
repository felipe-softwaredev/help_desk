import express from 'express';
import { login, register } from '../controller/authenticate.js';
import { authenticateJWT } from '../middleware/authentication.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login, authenticateJWT);

export default router;
