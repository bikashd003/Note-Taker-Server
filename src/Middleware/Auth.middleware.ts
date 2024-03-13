import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request & { user?: jwt.JwtPayload | string }, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization;
    if (!token) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
    try {
      const user = jwt.verify(token, `${process.env.SECRET_KEY}`) as jwt.JwtPayload;
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
  }
}
