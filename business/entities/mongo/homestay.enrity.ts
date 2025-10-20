import BaseEntityMongoDb from '../../../core/base-entity-mongodb';
import { SCHEMAS } from '../../../domains/mongodb/schemas';
import { MONGODB } from "../../../helpers/model-constants";

export default class HomeStayEntity extends BaseEntityMongoDb {
    constructor() {
        super(MONGODB.INSTANCES.HOMESTAY, SCHEMAS.HOMESTAY);
    }

    create(data: any) {
        return this._model.create(data)
    }

    getAll() {
        return this._model.find();
    }

    getById(_id: string, obj: any = {}) {
        return this._model.findById(_id, obj);
    }

    getAll2(filter: any = {}, projection: any = {}, skip: number = 0, limit: number = 10) {
        return this._model.find(filter, projection)
            .sort({ start_time: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    }

    update(_id: string, data: any) {
        return this._model.findByIdAndUpdate(_id, data, { new: true });
    }

    countDocuments(filter: any = {}) {
        return this._model.countDocuments(filter);
    }


    deleteOne(id: any) {
        return this._model.deleteOne({ _id: id })
    }
}