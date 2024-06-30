import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import {
  createUser,
  findUserByEmail,
  updateUserWithToken,
} from '../services/users.js';

export const signupController = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    throw createHttpError(409, 'Conflict. User is already exist.');
  }
  const newUser = await createUser(req.body);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  const compareResult = await bcrypt.compare(password, user.password);

  if (!compareResult) {
    throw createHttpError(401, 'Unauthorized');
  }

  const userWithNewToken = await updateUserWithToken(user._id);

  res.json({
    user: {
      name: userWithNewToken.name,
      email: userWithNewToken.email,
    },
    token: userWithNewToken.token,
  });
};
