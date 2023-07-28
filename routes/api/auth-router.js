import express from "express";
import authController from "../../controllers/auth/signup.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);

export default authRouter;
