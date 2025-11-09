import BaseController from "../../core/base-controller";

class HomestayBookedController extends BaseController {
    createHomestayBooked: any = this._call((req: any, data: any) => this._facade.createHomestayBooked(req.user,req.body));
    editHomestayBooked:any = this._call((req:any,data:any) => this._facade.editHomestayStatus(req.user,req.body))

}

export default new HomestayBookedController();