import BaseComponent from "../../core/base-component";
import vnp from "../../configs/vnpay";
import HomeStayBookedEntity from "../entities/mongo/homestay_booked.entity";
import { v4 as uuidv4 } from 'uuid';
class PaymentComponent extends BaseComponent {

    private _homestayBookedEntity = new HomeStayBookedEntity();

    async createPayment(data: any, ip: any, user: any) {
        const { amount, roomName, check_in_date, check_out_date, total_customer, order_id, ipAddr, homestay_id, images, address, totalRoom,price_room } = data;
        const vnp_TxnRef = uuidv4();
        try {

            const overlappingBooking = await this._homestayBookedEntity.findOne({
                homestay_id: homestay_id,
                check_in_date: { $lt: new Date(check_out_date) },
                check_out_date: { $gt: new Date(check_in_date) }
            });


            if (overlappingBooking) {
                throw new Error('Khoảng thời gian này đã có người đặt phòng');
            }

            console.log("overlap", overlappingBooking);

            await this._homestayBookedEntity.create({
                homestay_id,
                user_id: user._id,
                amount: amount,
                roomName,
                check_in_date,
                check_out_date,
                user_name_placer: user.name,
                phone_placer: user.phone,
                email_user: user.email,
                total_customer,
                order_id,
                txn_ref: vnp_TxnRef,
                status: 'pending',
                images,
                address,
                totalRoom,
                price_room
            })

            const paymentUrl = vnp.buildPaymentUrl({
                vnp_Amount: amount,
                vnp_IpAddr: ip,
                vnp_TxnRef: vnp_TxnRef,
                vnp_OrderInfo: `${homestay_id}`,
                vnp_OrderType: 'other' as any,
                vnp_ReturnUrl: `http://localhost:4200/payment-result`,
                vnp_Locale: 'vn' as any,
                vnp_BankCode: '',
            })
            return paymentUrl
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async handleIpn(data: any) {
        console.log("data payment succssessfully", data)
        try {
            console.log('IPN Data received:', data);
            const verify = vnp.verifyReturnUrl(data);
            if (!verify.isSuccess) {
                console.log('Signature verification failed');
                await this._homestayBookedEntity.updateOne(
                    { order_id: data.vnp_TxnRef },
                    { status: 'failed' }
                );
                return { success: false, message: 'Invalid signature' };
            }

            const txnRef = data.vnp_TxnRef;
            const amountReturned = Number(data.vnp_Amount);
            const responseCode = String(data.vnp_ResponseCode);

            console.log('Processing payment for order:', txnRef);

            const booking = await this._homestayBookedEntity.findOne({ order_id: txnRef });
            if (!booking) {
                console.log('Order not found:', txnRef);
                return { success: false, message: 'Order not found' };
            }

            if (booking.amount !== amountReturned) {
                console.log(`Amount mismatch: DB=${booking.amount}, VNPay=${amountReturned}`);
                await this._homestayBookedEntity.updateOne(
                    { order_id: txnRef },
                    { status: 'failed' }
                );
                return { success: false, message: 'Amount mismatch' };
            }

            if (responseCode === '00') {
                console.log('Payment successful, updating status to paid');
                await this._homestayBookedEntity.updateOne(
                    { order_id: txnRef },
                    {
                        status: 'paid',
                        paidAt: new Date(),
                        vnp_TransactionNo: data.vnp_TransactionNo,
                        vnp_BankCode: data.vnp_BankCode
                    }
                );
                return { success: true, message: 'Payment successful' };
            } else {
                console.log('Payment failed with response code:', responseCode);
                await this._homestayBookedEntity.updateOne(
                    { order_id: txnRef },
                    {
                        status: 'failed',
                        vnp_ResponseCode: responseCode // Lưu mã lỗi để debug
                    }
                );
                return { success: false, message: 'Payment failed or cancelled' };
            }
        } catch (error: any) {
            console.error('Error in handleIpn:', error);
            throw new Error(`IPN processing failed: ${error.message}`);
        }
    }
}

export default PaymentComponent;