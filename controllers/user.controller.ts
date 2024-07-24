import { Request, Response } from "express";
import * as yup from "yup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { handleValidationError } from "../utils/yupValidError";
import {
  userLoginBody,
  userSigninBody,
} from "../config/validation/user.validation";
import { printLog } from "../utils/loggers";
import APIResponse from "../utils/APIResponse";
import { User } from "../model/user.model";
import { payloadForToken } from "../config/interface/user.types";
import { jwtSecret } from "../utils/globalVars";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const data = await userSigninBody.validate(req.body, { abortEarly: false });
    const hashedPassword = await genrateHashPassword(data.password);
    data.password = hashedPassword;
    const newUser = new User(data);
    const response = await newUser.save();

    const payload = {
      id: response?.id,
      username: response?.name,
    };

    const jwtToken = generateJwtToken(payload);

    printLog("user saved succesfully", false, true, {
      userName: response.name,
    });
    res.status(200).json(APIResponse.success({ jwtToken }, "User saved in DB"));
  } catch (error: any) {
    printLog("something went wrong, while siging in user", error, false, null);
    if (error instanceof yup.ValidationError) {
      return handleValidationError(res, error, 500);
    } else {
      res
        .status(500)
        .json(
          APIResponse.error(
            "something went wrong while signing in",
            error.message
          )
        );
    }
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { aadharNumber, password } = await userLoginBody.validate(req.body, {
      abortEarly: false,
    });

    const getUser = await User.findOne({ aadharNumber }).exec();

    if (!getUser || !(await getUser.comparePassword(password))) {
      return res
        .status(401)
        .json(APIResponse.error("Invalid aadharNumber or password"));
    }

    const payload = {
      id: getUser.id,
      username: getUser.name,
    };

    const jwtToken = generateJwtToken(payload);

    printLog("User logged in successfully", false, true, {
      userName: getUser.name,
    });

    return res
      .status(200)
      .json(APIResponse.success({ jwtToken }, "User logged in"));
  } catch (error: any) {
    printLog("something went wrong, while siging in user", error, false, null);
    if (error instanceof yup.ValidationError) {
      handleValidationError(res, error, 500);
    } else {
      res
        .status(500)
        .json(
          APIResponse.error(
            "something went wrong while signing in",
            error.message
          )
        );
    }
  }
};

const generateJwtToken = (payload: payloadForToken): string => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
  return token;
};
const genrateHashPassword = async (pass: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

export default { userSignup };
