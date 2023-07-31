import express from "express";
import {
  authController,
  authLoginController,
  authCurrentUser,
  authSignoutUser,
  authUpdateSubscription,
} from "../../controllers/auth/index.js";

import { authenticate, isValidId } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authLoginController.signin);
authRouter.get("/current", authenticate, authCurrentUser.getCurrent);
authRouter.post("/signout", authenticate, authSignoutUser.signout);
authRouter.patch(
  "/:id/subscription",
  isValidId,
  authUpdateSubscription.updateUserSubscription
);

export default authRouter;
