import BaseController from "../../core/base-controller";

class PaymentController extends BaseController {
   createPayment:any = this._call((req:any,data:any) => this._facade.createPayment(req.body,req.ip,req.user));
   PaymentResult:any = this._call((req:any,data:any) => this._facade.paymentResult(req.body))

}

export default new PaymentController();