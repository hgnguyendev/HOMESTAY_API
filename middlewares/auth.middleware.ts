import facade from "../business/facade/facade";
import HandleResult from "../domains/handleResult";

export const verifyFirebaseToken = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization;
        console.log("token", token);
        if (!token) {
            return res.send(new HandleResult(false, null, [{ code: '401', text: 'Unauthorized' }]));
        }

        const result = await facade.verifyToken(token);
        if (!result) {
            return res.send(new HandleResult(false, null, [{ code: '401', text: 'Invalid token' }]));
        }

        req.user = result;
        return next();
    } catch (error: any) {
        return res.send(new HandleResult(false, null, [{ code: '401', text: error.message || error }]))
    }
}

export const verifyFirebaseTokenBo = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.send(new HandleResult(false, null, [{ code: '401', text: 'Unauthorized' }]));
        }
        const result = await facade.verifyTokenBo(token);
        if (!result) {
            return res.send(new HandleResult(false, null, [{ code: '401', text: 'Unauthorized' }]));
        }
        req.user_bo = result;
        return next();
    } catch (error: any) {
        return res.send(new HandleResult(false, null, [{ code: '401', text: error.message || error }]));
    }
};