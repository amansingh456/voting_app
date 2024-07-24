import { Router } from "express";
import { userLogin, userSignup } from "../controllers/user.controller";

const AuthRouter: Router = Router();
AuthRouter.post("/signin", userSignup);
AuthRouter.post("/login", userLogin);

export default AuthRouter;
