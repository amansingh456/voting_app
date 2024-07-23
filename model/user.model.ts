import mongoose, { Schema } from "mongoose";
import {
  GenderRoleEnum,
  UserI,
  UserRoleEnum,
} from "../config/interface/user.types";

const UserSchema: Schema = new Schema<UserI>({
  email: { type: String },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.Voter,
  },
  gender: {
    type: String,
    enum: Object.values(GenderRoleEnum),
    required: false,
  },
  mobileNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  isVoted: { type: Boolean, default: false },
});

export const User = mongoose.model<UserI>("User", UserSchema);
