import { firebaseAdminUser } from "../../configs/firebase";
import BaseComponent from "../../core/base-component";
import EmailUtil from "../../helpers/email-util";
import Util from "../../helpers/utils";
import OtpForgotPassWordEntity from "../entities/mongo/otp-forgot-password.entity";

class OtpForgotPassWordComponent extends BaseComponent {
    private _emailUtl = new EmailUtil;
    private _otpForgotPassWord = new OtpForgotPassWordEntity();

    async renderOtpForgotPassword(data: any) {
        const { email } = data;
        const otpCode = Util.generateCodeOTP(6);

        const htmlContent = `<p>Your OTP code is <strong>${otpCode}</strong></p>`;
        try {
            const result = await this._emailUtl.sendEmail(
                [email],
                'Reset your password',
                `Your OTP code is ${otpCode}`,
                htmlContent,
                null
            )
            const dataSaveDb = {
                email: email,
                code: otpCode
            }
            const response = await this._otpForgotPassWord.create(dataSaveDb);
            return response;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async CheckOtp(data: any) {
        const { _id, email, code } = data;
        try {
            const filter = { _id, email };
            const result = await this._otpForgotPassWord.findOne(filter);
            console.log("code request",code);
            console.log("code db",result.code)
            if (code !== result.code) {
                throw new Error('Mã Otp không hợp lệ');
                return;
            }
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }


}

export default OtpForgotPassWordComponent;