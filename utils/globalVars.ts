require("dotenv").config();

export const portNumber: number = parseInt(process.env.PORT || "3242");
export const mongoUrl: string = process.env.MONGO_URL || "";
export const jwtSecret: string = process.env.JWT_SECRET || "";
