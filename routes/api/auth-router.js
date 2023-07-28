import express from "express";
import {
  authController,
  authLoginController,
} from "../../controllers/auth/index.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authLoginController.signin);

export default authRouter;
