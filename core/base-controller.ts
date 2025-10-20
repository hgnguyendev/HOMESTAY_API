import { Response, Request } from "express";
import { validationResult, matchedData } from 'express-validator';
import BaseCore from "./base-core";
import HandleResult from "../domains/handleResult";
import facade from "../business/facade/facade";


class BaseController extends BaseCore {
    _call;
    _facade = facade;
    constructor() {
        super();

        this._call = (fn: any) => async (req: Request, res: Response) => {
            try {
                if (this._handleValidationResult(req, res)) return false;

                const data = matchedData(req);

                const result = await fn(req, data);

                this._handleResult(result, res);
            } catch (e) {
                this._handleError(e, res);
            }
        };
    }

    _handleResult(result: any, res: Response) {
        res.send(new HandleResult(true, result));
    }

    _handleError(error: any, res: Response) {
        this._log.error(error);

        res.send(
            new HandleResult(false, null, [
                {
                    code: error.code || this._constant.ERROR_CODE.CONTROLLER,
                    text: error.message || error,
                },
            ])
        );
    }

    _handleValidationResult(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errArr = errors
                .array()
                .map(error => ({ code: this._constant.ERROR_CODE.VALIDATOR, text: error.msg }));

            res.send(new HandleResult(false, null, errArr));

            return errArr;
        }

        return null;
    }
}

export default BaseController;