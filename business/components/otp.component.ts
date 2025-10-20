import BaseComponent from "../../core/base-component";
import OtpEntity from "../entities/mongo/otp.entity";


class OtpComponent extends BaseComponent {
    private _otpEntity = new OtpEntity();

    async createOtp(data: any) {
        try {
            console.log("otp", data);
            await this._otpEntity.create(data);
            return this._handleException('Send OTP successfully');
        } catch (error: any) {
            throw new Error(error);
        }
    }


}

export default OtpComponent;