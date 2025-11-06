import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class OtpForgotPassWordEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.OTP_FORGOT_PASSWORD, SCHEMAS.OTP_FORGOT_PASSWORD);
    }

    create(data: any) {
        return this._model.create(data)
    }

    findOne(filter:any,projection?:any,options?:any){
        return this._model.findOne(filter, projection, options)
    }

    deleteOne(_id: string) {
        return this._model.deleteOne(_id);
    }
}