import express from 'express';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';
import OtpController from './otp.controller';

const router = express.Router();
router.post('/create-otp',OtpController.createOtp);
router.post('/check-otp',OtpController.checkOtp)

export default router;


