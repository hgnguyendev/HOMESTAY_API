import express from 'express';
import paymentController from './payment.controller';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';

const PaymentRouter = express.Router();

PaymentRouter.post('/create-payment', verifyFirebaseToken, paymentController.createPayment)
PaymentRouter.post('/payment-result', paymentController.PaymentResult)

export default PaymentRouter;


