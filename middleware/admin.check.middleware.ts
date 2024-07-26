import { Response, NextFunction } from "express";
import { User } from "../model/user.model";
import APIResponse from "../utils/APIResponse";
import { printLog } from "../utils/loggers";

export const adminCheckMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const getIdForCheckAdmin = req?.user?.id;
    const user = await User.findById(getIdForCheckAdmin);
    if (user?.role !== "admin") {
      printLog("only admin have access to do this operatiom", true, false, {
        mobileNumber: user?.mobileNumber,
      });
      return res
        .status(403)
        .json(
          APIResponse.error("only admin have access to do this operatiom", null)
        );
    }
    next();
  } catch (error) {
    printLog(
      "something went wrong while checking is Admin or not",
      error,
      false,
      {
        mobileNumber: req?.body?.mobileNumber,
      }
    );
    return res.status(401).json({ error: "Invalid token" });
  }
};
