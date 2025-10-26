import express from 'express';
import paymentController from './payment.controller';

const PaymentRouter = express.Router();

PaymentRouter.post('/create-payment',paymentController.createPayment)

export default PaymentRouter;


