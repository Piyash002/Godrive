import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';
interface JwtPayload {
  id: Types.ObjectId;
  role: string;
}
export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: SignOptions['expiresIn']
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
