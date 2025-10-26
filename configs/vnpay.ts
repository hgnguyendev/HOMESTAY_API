import crypto from 'crypto';
import qs from 'qs';
import moment from 'moment';
import sysConfig from './systemt-configs';

interface BuildUrlParams {
    amount: number;
    orderId: string;
    orderInfo: string;
    ipAddr: string;
}

export class VNPayService {
    static buildPaymentUrl({ amount, orderId, orderInfo, ipAddr }: BuildUrlParams): string {
        const params: any = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: sysConfig.tmn_code,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: sysConfig.vnp_url_return,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        };

        const sorted: any = {};
        Object.keys(params).sort().forEach(key => {
            sorted[key] = params[key];
        });

        const signData = qs.stringify(sorted, { encode: false });
        const hmac = crypto.createHmac('sha512', sysConfig.vnp_hashsecret!);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        sorted.vnp_SecureHash = signed;

        const url = sysConfig.vnp_url + '?' + qs.stringify(sorted, { encode: false });
        return url;
    }
}
