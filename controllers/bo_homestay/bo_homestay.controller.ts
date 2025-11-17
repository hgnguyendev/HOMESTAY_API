import BaseController from "../../core/base-controller";

class BoHomeStayController extends BaseController {
   getHomestay: any = this._call((req: any, data: any) => this._facade.getAllHomeStay(req.query))
   createHomeStay: any = this._call((req: any, data: any) => this._facade.createHomestay(req.body))
   deleteHomestay: any = this._call((req: any, data: any) => this._facade.deleteHomestay(req.params._id))
   editHomestay:any = this._call((req:any,data:any) => this._facade.editHomestay(req.params._id,req.body))
   SearchHomestay:any = this._call((req:any,data:any) => this._facade.searchHomeStay(req.query));
   getHomestayFeatures:any = this._call((req:any,data:any) => this._facade.getHomestayFeatures());

}

export default new BoHomeStayController();