import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authconfig from '../config/authconfig';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authenticatedToken = request.headers.authorization;

  if(!authenticatedToken) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authenticatedToken.split(' ');

  try {
    const decoded = verify(token, authconfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    };

    return next();
  } catch {
    throw new Error('JWT token is wrong');
  }
}