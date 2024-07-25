import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import APIResponse from "../utils/APIResponse";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/globalVars";
import { payloadForToken } from "../config/interface/user.types";
import { printLog } from "../utils/loggers";

export const authJwtMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json(APIResponse.error("token not found", null));

  const extractToken = req?.headers?.authorization?.split(" ")[1];
  if (!extractToken)
    return res
      .status(401)
      .json(APIResponse.error("unauthorised to use services", null));

  try {
    const decoded = jwt.verify(extractToken, jwtSecret) as payloadForToken;
    req.user = decoded;
    next();
  } catch (err) {
    printLog("something went wrong while decoding token", err, false, null);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// reusable functions
export const generateJwtToken = (payload: payloadForToken): string => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
  return token;
};
export const genrateHashPassword = async (pass: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};
