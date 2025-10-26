import BaseController from "../../core/base-controller";

class PaymentController extends BaseController {
   createPayment:any = this._call((req:any,data:any) => this._facade.createPayment(req.body));

}

export default new PaymentController();