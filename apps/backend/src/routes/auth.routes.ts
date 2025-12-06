import { Router } from "express";
import { loginController, registerController, sendPasswordResetOtpController, updateUserPasswordController, validateOtpController } from "../controllers";


const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendPasswordResetOtpController);
router.post("/validate-otp", validateOtpController);
router.post("/update-password", updateUserPasswordController);

export default router;
