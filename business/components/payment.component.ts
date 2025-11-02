import BaseComponent from "../../core/base-component";
import vnp from "../../configs/vnpay";
import HomeStayBookedEntity from "../entities/mongo/homestay_booked.entity";
class PaymentComponent extends BaseComponent {

    private _homestayBookedEntity = new HomeStayBookedEntity();

    async createPayment(data: any, ip: any, user: any) {
        const { amount, roomName, check_in_date, check_out_date, total_customer, order_id, ipAddr, homestay_id } = data;
        const vnp_TxnRef = order_id;

        try {
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
                status: 'pending'
            })

            const paymentUrl = vnp.buildPaymentUrl({
                vnp_Amount: amount,
                vnp_IpAddr: ip,
                vnp_TxnRef: vnp_TxnRef,
                vnp_OrderInfo: `Thanh toan don hang ${order_id}`,
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
        try {
            console.log('IPN Data received:', data);

            // 1. Xác thực chữ ký VNPay
            const verify = vnp.verifyReturnUrl(data);
            if (!verify.isSuccess) {
                console.log('Signature verification failed');
                await this._homestayBookedEntity.updateOne(
                    { order_id: data.vnp_TxnRef }, // Sửa thành vnp_TxnRef
                    { status: 'failed' }
                );
                return { success: false, message: 'Invalid signature' };
            }

            const txnRef = data.vnp_TxnRef;
            const amountReturned = Number(data.vnp_Amount);
            const responseCode = String(data.vnp_ResponseCode);

            console.log('Processing payment for order:', txnRef);

            // 2. Tìm booking theo order_id (chính là txnRef)
            const booking = await this._homestayBookedEntity.findOne({ order_id: txnRef });
            if (!booking) {
                console.log('Order not found:', txnRef);
                return { success: false, message: 'Order not found' };
            }

            console.log('Booking found:', booking);

            // 3. So sánh số tiền
            if (booking.amount !== amountReturned) {
                console.log(`Amount mismatch: DB=${booking.amount}, VNPay=${amountReturned}`);
                await this._homestayBookedEntity.updateOne(
                    { order_id: txnRef },
                    { status: 'failed' }
                );
                return { success: false, message: 'Amount mismatch' };
            }

            // 4. Kiểm tra mã phản hồi
            if (responseCode === '00') {
                console.log('Payment successful, updating status to paid');
                await this._homestayBookedEntity.updateOne(
                    { order_id: txnRef },
                    {
                        status: 'paid',
                        paidAt: new Date(),
                        vnp_TransactionNo: data.vnp_TransactionNo, // Lưu thêm thông tin giao dịch
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