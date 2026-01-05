import { Router } from "express";
import {
  googleLoginController,
  loginController,
  registerController,
  sampleTestAuthorizationController,
  sendPasswordResetOtpController,
  sendVerificationLinkController,
  updateUserPasswordController,
  updateUserRoleController,
  validateOtpController,
  verifyAccountController,
} from "../controllers";
import { AuthRoleMiddleware, AuthTokenMiddleware } from "../middleware";
import { Role } from "../../../../packages/types";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendPasswordResetOtpController);
router.post("/validate-otp", validateOtpController);
router.post("/update-password", updateUserPasswordController);
router.post("/send-verification-link", sendVerificationLinkController);
router.get("/verify-account/:id", verifyAccountController);
router.post("/google-login", googleLoginController);
router.patch("/update-role", updateUserRoleController);
router.get(
  "/sample-test-authorization",
  AuthTokenMiddleware,
  AuthRoleMiddleware([Role.HIRING_MANAGER]),
  sampleTestAuthorizationController,
);

export default router;
