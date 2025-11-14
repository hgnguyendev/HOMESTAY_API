import express from 'express';
import homestay_bookedController from './homestay_booked.controller';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';
const homestayBookedRouter = express.Router();


homestayBookedRouter.post('/create-booked', verifyFirebaseToken, homestay_bookedController.createHomestayBooked);
homestayBookedRouter.put('/create-booked', verifyFirebaseToken, homestay_bookedController.editHomestayBooked);
homestayBookedRouter.put('/booked-payment/:txn_ref', verifyFirebaseToken, homestay_bookedController.updateBookedPaymentSuccess)

export default homestayBookedRouter;


