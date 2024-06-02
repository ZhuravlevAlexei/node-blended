import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  res.status(500).json({ message: error.message });
};
