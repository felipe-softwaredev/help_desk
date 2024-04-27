import { SECRET_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

export const createToken = (user) => {
  let payload = {
    username: user.username,
  };

  return sign(payload, SECRET_KEY);
};

export const validateToken = (token) => {
  return verify(token, SECRET_KEY);
};
