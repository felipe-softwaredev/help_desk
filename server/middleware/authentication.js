import { UnauthorizedError } from '../helpers/expressError.js';
import { validateToken } from '../helpers/jwtToken.js';

export const authenticateJWT = (req, res, next) => {
  try {
    const authToken = req.cookies.Admin[1];
    if (authToken) {
      req.user_data = validateToken(authToken);
      return next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (err) {
    return next(err);
  }
};
