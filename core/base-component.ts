import BaseCore from "./base-core";

class BaseComponent extends BaseCore {
    constructor() {
        super();
    }

    _handleResult(result: any, resolve: any) {
        return resolve(result);
    }

    _handleSuccess(result: any) {
        return result;
    }

    _handleError(error: any, reject: any) {
        return reject(error);
    }
}

export default BaseComponent;