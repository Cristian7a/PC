import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db'; // Assuming you have a db connection pool
import jwt from 'jsonwebtoken';
import { AppUserDatabase, AppUserSafe, getAppUserDBBy } from '../models/user-model';
import { JWT_SECRET } from '../env.config';
import crypto from 'node:crypto';
import { RegisterInput, LoginInput } from '@nx-workspace/validation';
import { ProblemError } from '../shared/errors/problem-error';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, email } = req.body as RegisterInput;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // TODO Enrique: Improve the complexity of the hash
    const refresh = crypto.randomBytes(32).toString('base64');
    await pool.query('INSERT INTO users (name, password, email, refresh) VALUES ($1, $2, $3, $4)', [
      name,
      hashedPassword,
      email,
      refresh,
    ]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    next(
      new ProblemError({
        detail: 'Error registering user',
        instance: req.originalUrl,
      }),
    );
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as LoginInput;

  try {
    const user = await getAppUserDBBy('email', email);

    if (!user) {
      return next(
        new ProblemError({
          status: 401,
          title: 'Unauthorized',
          detail: 'Invalid credentials',
          instance: req.originalUrl,
        }),
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(
        new ProblemError({
          status: 401,
          title: 'Unauthorized',
          detail: 'Invalid credentials',
          instance: req.originalUrl,
        }),
      );
    }

    const tokens = generateUserTokens(user);
    res.json({ ...tokens, id: user.id });
  } catch (error) {
    console.error('Login error:', error);
    next(
      new ProblemError({
        status: 500,
        title: 'Internal Server Error',
        detail: 'Error logging in',
        instance: req.originalUrl,
      }),
    );
  }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken, id } = req.body;

  if (!refreshToken || !id) {
    return next(
      new ProblemError({
        status: 400,
        title: 'Bad Request',
        detail: 'Missing refreshToken or id',
        instance: req.originalUrl,
      }),
    );
  }

  try {
    const user = await getAppUserDBBy('id', id);

    if (!user) {
      return next(
        new ProblemError({
          status: 401,
          title: 'Unauthorized',
          detail: 'User not found',
          instance: req.originalUrl,
        }),
      );
    }

    try {
      jwt.verify(refreshToken, user.refresh);
    } catch (_error) {
      console.error('Refresh token verification failed:', _error);
      return next(
        new ProblemError({
          status: 401,
          title: 'Unauthorized',
          detail: 'Invalid refresh token',
          instance: req.originalUrl,
        }),
      );
    }

    const tokens = generateUserTokens(user);
    res.json(tokens);
  } catch (error) {
    console.error('Error refreshing token:', error);
    next(
      new ProblemError({
        status: 500,
        title: 'Internal Server Error',
        detail: 'Error refreshing token',
        instance: req.originalUrl,
      }),
    );
  }
};

const generateUserTokens = (user: AppUserDatabase) => {
  const userDataToSign: AppUserSafe = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  const token = jwt.sign(userDataToSign, JWT_SECRET, {
    expiresIn: '8h',
  });
  const refreshToken = jwt.sign(userDataToSign, user.refresh, { expiresIn: '1d' });

  return { token, refreshToken, id: user.id };
};
