import BaseController from "../../core/base-controller";

class OtpForgotPasswordController extends BaseController {
    RenderOtpForgotPassWord:any = this._call((req:any,data:any) => this._facade.RenderOtpForgotPassWord(req.body));
    CheckOtp:any = this._call((req:any,data:any) => this._facade.CheckOtp(req.body));


}

export default new OtpForgotPasswordController();