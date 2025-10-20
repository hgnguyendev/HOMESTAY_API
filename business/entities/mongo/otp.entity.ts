import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class OtpEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.OTP_CODES, SCHEMAS.OTP_CODES);
    }

    create(data: any) {
        return this._model.create(data)
    }
}