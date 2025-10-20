import BaseController from "../../core/base-controller";

class OtpController extends BaseController { 
    createOtp: any = this._call((req: any, data: any) => this._facade.createOtp(req.body));

}

export default new OtpController();