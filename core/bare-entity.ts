import BaseCore from "./base-core";
import { MONGODB } from "../helpers/model-constants";

class BaseEntity extends BaseCore {
    protected _modelConstants:any;

    constructor(){
        super();
        this._modelConstants = {MONGODB};
    }
}

export default BaseEntity;