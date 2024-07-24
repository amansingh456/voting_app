import * as yup from "yup";
import { GenderRoleEnum, UserRoleEnum } from "../interface/user.types";

export const userSigninBody = yup.object().shape({
  email: yup.string().email(),
  role: yup.string().oneOf(Object.values(UserRoleEnum)).required(),
  gender: yup.string().oneOf(Object.values(GenderRoleEnum)),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  address: yup.string().required("Address is required"),
  aadharNumber: yup
    .string()
    .required("Aadhar number is required")
    .matches(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits"),
  isVoted: yup.boolean().default(false),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const userLoginBody = yup.object().shape({
  aadharNumber: yup
    .string()
    .required("Aadhar number is required")
    .matches(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
