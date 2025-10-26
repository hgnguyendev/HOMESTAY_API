import BaseController from "../../core/base-controller";

class UserController extends BaseController { 
    createUser: any = this._call((req: any, data: any) => this._facade.createUser(req.body));
    editUser:any = this._call((req:any,data:any) => this._facade.editUser(req.body,req.user))
    getUserInfo:any = this._call((req:any,data:any) => this._facade.getUserInfo(req.user));

}

export default new UserController();