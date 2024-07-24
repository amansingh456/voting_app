import bcrypt from "bcrypt";
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
  password: { type: String, required: true },
});

UserSchema.methods.comparePassword = async function (
  upcomingPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(upcomingPassword, this.password);
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model<UserI>("User", UserSchema);
