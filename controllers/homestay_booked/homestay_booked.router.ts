import express from 'express';
import homestay_bookedController from './homestay_booked.controller';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';
const homestayBookedRouter = express.Router();


homestayBookedRouter.post('/create-booked', verifyFirebaseToken, homestay_bookedController.createHomestayBooked);
homestayBookedRouter.put('/create-booked', verifyFirebaseToken, homestay_bookedController.editHomestayBooked);
homestayBookedRouter.put('/booked-payment/:txn_ref', verifyFirebaseToken, homestay_bookedController.updateBookedPaymentSuccess);
homestayBookedRouter.get('/homestay-booked/:homestay_id',homestay_bookedController.listHomestayBooked);
homestayBookedRouter.get('/homestay-booked-user',verifyFirebaseToken,homestay_bookedController.getHomestayBookedUser);
homestayBookedRouter.delete('/homestay-booked-user/:_id',verifyFirebaseToken,homestay_bookedController.deleteHomestayBooked);
homestayBookedRouter.get('/get-all-booked',homestay_bookedController.getAllHomestayBooked);

export default homestayBookedRouter;


