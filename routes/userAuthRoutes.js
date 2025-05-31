import { Router } from "express";
import { accountAuthHandler, loginAccountHandler, newAccountHandler } from "../controllers/user.Related.Controller.js";

const userAuthRoutes = Router();

userAuthRoutes.get("/get-account-info", accountAuthHandler);
userAuthRoutes.post("/create-new-account", newAccountHandler);
userAuthRoutes.post("/login-account", loginAccountHandler);

export default userAuthRoutes;
