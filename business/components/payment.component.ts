import BaseComponent from "../../core/base-component";
import { VNPayService } from "../../configs/vnpay";
class PaymentComponent extends BaseComponent {

    async createPayment(data: any) {
        const { amount, orderInfo, ipAddr } = data;

        if (!amount || !orderInfo) {
            throw new Error('amount and orderInfo not found');
        }
        try {
            const orderId = `ORDER_${Date.now()}`;
            const paymentUrl = VNPayService.buildPaymentUrl({
                amount,
                orderId,
                orderInfo,
                ipAddr: ipAddr || '127.0.0.1'
            });

            return { orderId, paymentUrl };


        } catch (error: any) {
            throw new Error(error);
        }
    }

}

export default PaymentComponent;