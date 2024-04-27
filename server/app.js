import express from 'express';
import cors from 'cors';
import authenticateRoute from './routes/authenticationRoute.js';
import ticketRoute from './routes/ticketRoute.js';
import adminRouter from './routes/adminRoute.js';
import cookieParser from 'cookie-parser';
import { NotFoundError } from './helpers/expressError.js';

import { fileURLToPath } from 'url';
import path from 'path';

const dirname = path.dirname;
const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, '../client/build');
const app = express();

app.use(express.static(buildPath));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authenticateRoute);
app.use('/api/admin/tickets', ticketRoute);
app.use('/api/admin', adminRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;
