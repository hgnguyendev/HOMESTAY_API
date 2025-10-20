import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class BoUserEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.BO_USERS, SCHEMAS.BO_USERS);
    }

    create(data: any) {
        return this._model.create(data)
    }

    getById(_id: string, obj: any = {}) {
        return this._model.findById(_id, obj);
    }
}