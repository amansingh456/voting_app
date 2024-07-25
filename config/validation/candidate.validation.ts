import * as yup from "yup";

const VotesSchema = yup.object().shape({
  userId: yup.string().required("user ID is required"),
  voteAt: yup.date().required("vote date is required"),
});

export const candidateValidation = yup.object().shape({
  email: yup.string().email().optional(),
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
  party: yup.string().required("Party is required"),
  votes: yup.array().of(VotesSchema).optional(),
  voteCount: yup.number().default(0).optional(),
});
