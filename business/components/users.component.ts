import { firebaseAdminUser } from "../../configs/firebase";
import BaseComponent from "../../core/base-component";
import { IUser } from "../../interface/user.interface";
import UserEntity from "../entities/mongo/user.entity";

class UsersComponent extends BaseComponent {
    private _userEntity = new UserEntity();

    getUserInfo(data: any) {
        try {
            return this._handleSuccess(data);
        } catch (error: any) {
            return this._handleException(error, 'UsersComponent', 'getUserInfo');
        }
    }

    async getAllUser() {
        try {
            const response = await this._userEntity.getAll({});
            return response;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async verifyToken(token: string) {
        try {
            const decodedToken = await firebaseAdminUser.auth().verifyIdToken(this._util.getToken(token), true);
            if (!decodedToken || !decodedToken.uid) {
                throw { message: 'Token is invalid', code: 'token-invalid' };
            }
            const userId = decodedToken.uid;
            const fields = {
                _id: 1,
                email: 1,
                name: 1,
                phone: 1,
                user_id: 1,
                role: 1,
                address: 1,
                tokens: 1,
            };
            const user = await this._userEntity.getById(userId, fields);
            return this._handleSuccess(user);
        } catch (error) {
            return this._handleException(error, 'UsersComponent', 'verifyToken', token);
        }
    }

    async createUser(data: any) {
        try {
            await this._userEntity.create(data);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async editUser(data: any, user: any) {
        console.log("data edit", data);
        try {
            const result = await this._userEntity.update(user._id, data);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async deleteUser(id: string) {
        try {
            await firebaseAdminUser.auth().deleteUser(id);
            await this._userEntity.deleteOne(id);
            return this._handleSuccess({ message: 'Xoá user thành công', deletedId: id });
        } catch (error: any) {
            return this._handleException(error, 'UsersComponent', 'deleteUser', { id });
        }
    }

}

export default UsersComponent;