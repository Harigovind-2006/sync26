import jwt from "jsonwebtoken";
import { config } from "../config/env";

export interface JwtPayloadCustom {
  id: string;
  email: string;
  name: string;
}

export const generateToken = (payload: JwtPayloadCustom): string => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): JwtPayloadCustom => {
  return jwt.verify(token, config.JWT_SECRET) as JwtPayloadCustom;
};
