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

    getAll(filter?: any, projection?: any, options?: any) {
        return this._model.find(filter, projection, options)
    }

    async getByEmail(email: string) {
        return this._model.findOne({ email });
    }
   
    update(_id: string, data: any) {
        return this._model.findByIdAndUpdate(_id, data, { new: true });
    }


    getById(_id: string, obj: any = {}) {
        return this._model.findById(_id, obj);
    }

    deleteOne(id: string) {
        return this._model.deleteOne({ _id: id })
    }
}