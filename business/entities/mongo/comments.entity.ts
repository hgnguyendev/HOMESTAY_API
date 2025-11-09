import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class CommentsEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.COMMENTS, SCHEMAS.COMMENTS);
    }

    create(data: any) {
        return this._model.create(data)
    }

    getAll(filter: any, projection: any, options: any) {
        return this._model.find(filter, projection, options);
    }

    updateOne(filter: any, update: any, options: any = {}) {
        return this._model.updateOne(filter, update, options);
    }

    findOne(filter: any, projection: any = {}, options: any = {}) {
        return this._model.findOne(filter, projection, options);
    }
}