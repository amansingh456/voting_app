import { Response } from "express";
import * as yup from "yup";
import APIResponse from "./APIResponse";

export const handleValidationError = (
  res: Response,
  error: yup.ValidationError,
  statusCode: number
): Response => {
  return res
    .status(statusCode)
    .json(APIResponse.error("Validation errors", error.errors));
};
