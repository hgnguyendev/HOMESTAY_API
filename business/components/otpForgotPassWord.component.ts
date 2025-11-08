import { firebaseAdminUser } from "../../configs/firebase";
import BaseComponent from "../../core/base-component";
import EmailUtil from "../../helpers/email-util";
import Util from "../../helpers/utils";
import OtpForgotPassWordEntity from "../entities/mongo/otp-forgot-password.entity";
import UserEntity from "../entities/mongo/user.entity";

class OtpForgotPassWordComponent extends BaseComponent {
    private _emailUtl = new EmailUtil;
    private _otpForgotPassWord = new OtpForgotPassWordEntity();
    private _userEntity = new UserEntity();

    async renderOtpForgotPassword(data: any) {
        const { email } = data;
        const otpCode = Util.generateCodeOTP(6);
        const htmlContent = `<p>Your OTP code is <strong>${otpCode}</strong></p>`;

        try {
            const user = await this._userEntity.getByEmail(email);

            if (!user) {
                throw new Error('Email không tồn tại trong hệ thống, không thể gửi OTP');
            }

            await this._emailUtl.sendEmail(
                [email],
                'Reset your password',
                `Your OTP code is ${otpCode}`,
                htmlContent,
                null
            );

            const response = await this._otpForgotPassWord.create({
                email,
                code: otpCode
            });

            return response;

        } catch (error: any) {
            throw new Error(error.message || 'Gửi OTP thất bại');
        }
    }


    async CheckOtp(data: any) {
        const { _id, email, code } = data;
        try {
            const filter = { _id, email };


            const result = await this._otpForgotPassWord.findOne(filter);
            console.log("code request", code);
            console.log("code db", result.code)
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