import express from "express";
import {
  authController,
  authLoginController,
  authCurrentUser,
  authSignoutUser,
  authUpdateSubscription,
  authUpdateUserAvatar,
  authVerification,
  authResendEmail,
} from "../../controllers/auth/index.js";

import { authenticate, isValidId, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.get("/verify/:verificationToken", authVerification.verify);
authRouter.post("/verify", authResendEmail.resendEmail);
authRouter.post("/signin", authLoginController.signin);
authRouter.get("/current", authenticate, authCurrentUser.getCurrent);
authRouter.post("/signout", authenticate, authSignoutUser.signout);
authRouter.patch(
  "/:id/subscription",
  isValidId,
  authUpdateSubscription.updateUserSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authUpdateUserAvatar.updateUserAvatar
);

export default authRouter;
