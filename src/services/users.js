import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/model/user.js';
import { env } from '../utils/env.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const updateUserWithToken = (userId) => {
  const token = jwt.sign({ userId }, env('JWT_SECRET'), { expiresIn: '24h' });

  return User.findByIdAndUpdate(userId, { token }, { new: true });
};

export const createUser = async (userData) => {
  const { name, email, password } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  return updateUserWithToken(user._id);
};
