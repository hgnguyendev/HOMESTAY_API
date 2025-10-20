import sysConfig from "../configs/systemt-configs";
import Constants from "../helpers/constants";
import Util from "../helpers/utils";

const log = sysConfig.log();

class BaseCore {
    _sysConfig = sysConfig;
    _log;
    _util = Util;
    _constant = Constants

    constructor() {
        this._log = log;
    }

    _handleException(exception: any, module: string = '', func: string = '', data: any = null) {
        this._log.error(`${exception} - module: ${module} - func: ${func} - data: ${JSON.stringify(data)}`);
        // if (exception && !exception.prevent_log && (module || func || data))
        //     if (exception.prevent_log)
        //         // this._eventUtil.emitSystemLog('error', {
        //         //     module, function: func, message: exception.message || exception.code, data: JSON.stringify(data || {}),
        //         //     created_date: new Date()
        //         // });

        //         delete exception.prevent_log;
        throw exception;
    }
}

export default BaseCore;