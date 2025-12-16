import { Router } from "express";
import { loginController, registerController, sendPasswordResetOtpController, sendVerificationLinkController, updateUserPasswordController, validateOtpController, verifyAccountController } from "../controllers";


const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendPasswordResetOtpController);
router.post("/validate-otp", validateOtpController);
router.post("/update-password", updateUserPasswordController);
router.post("/send-verification-link", sendVerificationLinkController);
router.get("/verify-account/:id", verifyAccountController);


export default router;
