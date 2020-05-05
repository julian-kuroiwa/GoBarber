import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authconfig from '@config/authconfig';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authenticatedToken = request.headers.authorization;

  if (!authenticatedToken) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authenticatedToken.split(' ');

  try {
    const decoded = verify(token, authconfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT token is wrong', 401);
  }
}
