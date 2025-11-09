import BaseController from "../../core/base-controller";

class CommentsController extends BaseController { 
    createComments:any = this._call((req:any,data:any) => this._facade.createComments(req.user,req.body))
    getComments:any = this._call((req:any,data:any) => this._facade.getComments(req.params.room_id))
}

export default new CommentsController ();