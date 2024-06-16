import { isHttpError } from 'http-errors';
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // if (isHttpError(error)) {
  //   res.status(error.status).json({ message: error.message });
  //   return;
  // }
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
  res.status(500).json({ message: err.message });
};
