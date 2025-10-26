import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class UserEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.USERS, SCHEMAS.USERS);
    }

    create(data: any) {
        return this._model.create(data)
    }

    update(_id: string, data: any) {
        return this._model.findByIdAndUpdate(_id, data, { new: true });
    }


    getById(_id: string, obj: any = {}) {
        return this._model.findById(_id, obj);
    }
}