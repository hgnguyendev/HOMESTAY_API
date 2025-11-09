import express, { Request, Response } from 'express';
import { verifyFirebaseToken, verifyFirebaseTokenBo } from '../middlewares/auth.middleware';
import UserRouter from './users/users.router';
import BoUserRouter from './bo_users/bo_user.router'
import boHomestayRouter from './bo_homestay/bo_homestay.router';
import homestayBookedRouter from './homestay_booked/homestay_booked.router';
import PaymentRouter from './payment/payment.router';
import OtpRouter from './otp/otp.router';
import OtpForgotPasswordRouter from './otp_forgot_password/otp_forgot_password.router';
import CommonetsRouter from './comments/comments.router'

const router = express.Router();

router.use('/users', UserRouter);
router.use('/otp', OtpRouter);
router.use('/bo-users', verifyFirebaseTokenBo, BoUserRouter);
router.use('/homestay', boHomestayRouter);
router.use('/homestay-booking', homestayBookedRouter);
router.use('/payment', PaymentRouter);
router.use('/comments', CommonetsRouter);
router.use('/otp-forgot-password', OtpForgotPasswordRouter);

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, AI PLATFORM API');
});

export default router;