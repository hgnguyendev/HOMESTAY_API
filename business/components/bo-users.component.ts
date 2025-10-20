import { firebaseAdminUserBo } from "../../configs/firebase";
import BaseComponent from "../../core/base-component";
import BoUserEntity from "../entities/mongo/bo-user.entity";


class BoUserComponent extends BaseComponent {
    private _boUserEntity = new BoUserEntity();

    getUserBoInfo(data: any) {
        try {
            return data
        } catch (error: any) {
            return this._handleException(error, 'BoUserComponent', 'getUserInfo');
        }
    }

    async verifyTokenBo(token: string) {
        try {
            const decodedToken = await firebaseAdminUserBo.auth().verifyIdToken(this._util.getToken(token), true);
            const fields = {
                _id: 1,
                role: 1,
                email: 1,
                name: 1
            };
            const user = await this._boUserEntity.getById(decodedToken.uid, fields);
            return this._handleSuccess(user);
        } catch (error: any) {
            return this._handleException(error, 'BoUserComponent', 'verifyTokenBo', token);
        }
    }
}

export default BoUserComponent