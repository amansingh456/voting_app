export enum GenderRoleEnum {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum UserRoleEnum {
  Voter = "voter",
  Admin = "admin",
}

export interface UserI extends Document {
  email: string;
  mobileNumber: string;
  role: UserRoleEnum;
  gender: GenderRoleEnum;
  name: string;
  age: number;
  address: string;
  aadharNumber: string;
  isVoted: boolean;
  password: String;
  comparePassword(upcomingPassword: string): Promise<boolean>;
}

export interface payloadForToken {
  id: string;
  name: string;
  iat?: number;
  exp?: number;
}
