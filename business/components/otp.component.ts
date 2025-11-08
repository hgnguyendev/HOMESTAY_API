import BaseComponent from "../../core/base-component";
import OtpEntity from "../entities/mongo/otp.entity";
import UserEntity from "../entities/mongo/user.entity";
import Util from "../../helpers/utils";
import EmailUtil from "../../helpers/email-util";


class OtpComponent extends BaseComponent {
    private _otpEntity = new OtpEntity();
    private _userEntity = new UserEntity();
    private _emailUtl = new EmailUtil;

    async createOtp(data: any) {
        const otp = Util.generateCodeOTP(6);
        const htmlContent = `<p>Your OTP code is <strong>${otp}</strong></p>`;
        try {
            const dataOptSave = {
                email: data.email,
                code: otp
            }
            await this._emailUtl.sendEmail(
                [data.email],
                'Otp đăng ký tài khoản Homestay',
                `Your OTP code is ${otp}`,
                htmlContent,
                null
            );
            const result = await this._otpEntity.create(dataOptSave);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async checkOtpRegister(data: any) {
        const { email, otp } = data;

        if (!email || !otp) {
            throw { code: '3000', message: 'Email và mã OTP là bắt buộc' };
        }

        try {
            const filter = { email, code: otp };
            const checkOtp = await this._otpEntity.getOne(filter, {}, {});

            if (!checkOtp) {
                throw { code: '3001', message: 'OTP không hợp lệ hoặc email không đúng' };
            }

            return { success: true, data: { email: checkOtp.email }, messageList: [] };
        } catch (error: any) {
            if (error.code && error.message) {
                throw { success: false, data: null, messageList: [{ code: error.code, text: error.message }] };
            }
            throw { success: false, data: null, messageList: [{ code: '3002', text: 'Lỗi máy chủ, vui lòng thử lại sau' }] };
        }
    }



}

export default OtpComponent;