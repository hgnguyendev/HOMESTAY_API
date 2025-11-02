import { VNPay } from "vnpay";
import sysConfig from "./systemt-configs";

const vnp = new VNPay({
    tmnCode: sysConfig.tmn_code!,
    secureSecret: sysConfig.vnp_hashsecret!,
    vnpayHost: sysConfig.vnp_url,
    testMode: true,
})

export default vnp