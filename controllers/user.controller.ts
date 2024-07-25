import { Request, Response } from "express";
import * as yup from "yup";
import { handleValidationError } from "../utils/yupValidError";
import {
  userLoginBody,
  userSigninBody,
} from "../config/validation/user.validation";
import { printLog } from "../utils/loggers";
import APIResponse from "../utils/APIResponse";
import { User } from "../model/user.model";

import {
  generateJwtToken,
  genrateHashPassword,
} from "../middleware/jwt.token.middleware";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const data = await userSigninBody.validate(req.body, { abortEarly: false });
    const hashedPassword = await genrateHashPassword(data.password);
    data.password = hashedPassword;
    const newUser = new User(data);
    const response = await newUser.save();

    const payload = {
      id: response?.id,
      name: response?.name,
    };

    const jwtToken = generateJwtToken(payload);

    printLog("user saved succesfully", false, true, {
      userName: response.name,
    });
    res.status(200).json(APIResponse.success({ jwtToken }, "User saved in DB"));
  } catch (error: any) {
    printLog("something went wrong, while siging in user", error, false, null);
    if (error instanceof yup.ValidationError) {
      return handleValidationError(res, error, 400);
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
      name: getUser.name,
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
      handleValidationError(res, error, 400);
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

export default { userSignup };
