import mongoose from "mongoose";
import BaseCore from "./base-core";

class BaseEntityMongoDb extends BaseCore {
    _model: any;

    constructor(model: any, schema: any) {
        super();
        this._model = mongoose.model(model, schema);
    }
}

export default BaseEntityMongoDb;