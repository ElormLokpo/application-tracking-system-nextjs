import { NextFunction, Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dtos";
import { googleAuthService, loginUser, registerUser, sendPasswordResetOtp, sendVerificationLink, updateUserPassword, updateUserRole, validateOtp, verifyAccount } from "../services";
import { CustomError } from "../utils/";
import { ResponseHandler } from "../handlers";
import { OAuth2Client } from "google-auth-library"


export const registerController = async (req: Request<{}, {}, RegisterDto>, res: Response, next: NextFunction) => {
    const token = await registerUser(req.body as RegisterDto);

    if (token instanceof CustomError) {
        return next(token);
    }

    return new ResponseHandler(res).successDataHandler(token, "User registered successfully");
}


export const loginController = async (req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) => {
    const token = await loginUser(req.body as LoginDto);

    if (token instanceof CustomError) {
        return next(token);
    }

    return new ResponseHandler(res).successDataHandler(token, "User logged in successfully");
}


export const sendPasswordResetOtpController = async (req: Request, res: Response, next: NextFunction) => {
    await sendPasswordResetOtp(req.body.email as string);



    return new ResponseHandler(res).successDataHandler(true, "Otp sent successfully");
}

export const validateOtpController = async (req: Request, res: Response, next: NextFunction) => {
    const otpValidated = await validateOtp(req.body.email, req.body.otp);


    return new ResponseHandler(res).successDataHandler(otpValidated, "Otp validated successfully");
}


export const updateUserPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    const user = await updateUserPassword(req.body.email, req.body.password);


    return new ResponseHandler(res).successDataHandler(user, "Password updated successfully");
}

export const sendVerificationLinkController = async (req: Request, res: Response, next: NextFunction) => {
    await sendVerificationLink(req.body.email as string);

    return new ResponseHandler(res).successDataHandler(true, "Verification link sent successfully");
}


export const verifyAccountController = async (req: Request, res: Response, next: NextFunction) => {
    await verifyAccount(req.params.id as string);

    return res.redirect("http://localhost:3000/home");
}

export const sampleTestAuthorizationController = async (req: Request, res: Response, next: NextFunction) => {
    return new ResponseHandler(res).successDataHandler(true, "Test authorization successfully");
}


export const googleLoginController = async (req: Request, res: Response, next: NextFunction) => {
    let authMessage;
    try {

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'postmessage',
        );


        const { tokens } = await oAuth2Client.getToken(req.body.code);

        const ticket = await oAuth2Client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();
  
        const email = payload!.email;
        const name = payload!.name;
      
      

        authMessage = await googleAuthService(email as string, name as string);

    } catch (error) {
      
        authMessage = "Error connecting to google, try again later";
    }

    return new ResponseHandler(res).successDataHandler(authMessage, "Google login successful");
}

export const updateUserRoleController = async (req: Request, res: Response, next: NextFunction) => {
    const user = await updateUserRole(req.body.email, req.body.role);

    return new ResponseHandler(res).successDataHandler(user, "User role updated successfully");
}