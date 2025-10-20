import BaseController from "../../core/base-controller";

class BoUserController extends BaseController { 
   getUser:any = this._call((req:any,data:any) => this._facade.getUserBoInfo(req.user_bo))

}

export default new BoUserController();