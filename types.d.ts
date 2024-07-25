import { payloadForToken } from "./config/interface/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: payloadForToken;
    }
  }
}
