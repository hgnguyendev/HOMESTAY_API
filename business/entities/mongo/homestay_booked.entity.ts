import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class HomeStayBookedEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.HOMESTAY_BOOKED, SCHEMAS.HOMESTAY_BOOKED);
    }

    create(data: any) {
        return this._model.create(data)
    }

    getAll() {
        return this._model.find();
    }

    updateOne(filter: any, update: any, options: any = {}) {
        return this._model.updateOne(filter, update, options);
    }

    findOne(filter: any, projection: any = {}, options: any = {}) {
        return this._model.findOne(filter, projection, options);
    }
}