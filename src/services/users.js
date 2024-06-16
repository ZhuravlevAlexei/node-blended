import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../db/model/user.js';
import { Session } from '../db/model/session.js';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  const { email, name, password } = payload;
  const user = await User.findOne({ email });
  if (user) throw createHttpError(409, 'This user is already regisrered');

  const cryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...payload,
    password: cryptedPassword,
  });
  return newUser;
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, 'Email or password is wrong!');

  const compareAnswer = await bcrypt.compare(password, user.password);

  if (!compareAnswer) throw (401, 'Email or password is wrong!');

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(40).toString('base64');
  const refreshToken = randomBytes(40).toString('base64');

  const newSession = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  return newSession;
};
