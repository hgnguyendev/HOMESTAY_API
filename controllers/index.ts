import express, { Request, Response } from 'express';
import { verifyFirebaseToken, verifyFirebaseTokenBo } from '../middlewares/auth.middleware';
import UserRouter from './users/users.router';
import BoUserRouter from './bo_users/bo_user.router'
import boHomestayRouter from './bo_homestay/bo_homestay.router';
import OtpRouter from './otp/otp.router';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/otp', OtpRouter);
router.use('/bo-users', verifyFirebaseTokenBo, BoUserRouter);
router.use('/homestay',boHomestayRouter);

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, AI PLATFORM API');
});

export default router;