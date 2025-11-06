import express from 'express';
import otp_forgot_passwordController from './otp_forgot_password.controller';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';

const OtpForgotPasswordRouter = express.Router();

OtpForgotPasswordRouter.post('/render-otp',otp_forgot_passwordController.RenderOtpForgotPassWord);
OtpForgotPasswordRouter.post('/check-otp',otp_forgot_passwordController.CheckOtp)

export default OtpForgotPasswordRouter;


