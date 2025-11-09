import BaseComponent from "../../core/base-component";
import { IHomestayBooked } from "../../interface/homestay_booked.interface";
import HomeStayEntity from "../entities/mongo/homestay.enrity";
import HomeStayBookedEntity from "../entities/mongo/homestay_booked.entity";

class HomeStayBookedComponent extends BaseComponent {
    private _homestayBookedEntity = new HomeStayBookedEntity();
    private _homestayEntity = new HomeStayEntity();

    async createHomestayBooked(user: any, data: IHomestayBooked) {
        console.log("user", user)
        const { homestay_id, roomName, check_in_date, check_out_date, total_price, user_name_placer, phone_placer, total_customer } = data
        try {
            if (!homestay_id) {
                throw new Error('homestay id not found')
            }

            if (!total_price) {
                throw new Error('totalPrice not found')
            }

            if (!check_in_date && !check_out_date) {
                throw new Error('Check in date and checkout date not found')
            }

            if (!user._id) {
                throw new Error('user id not found');
            }

            if (!total_customer) {
                throw new Error('total customer not found')
            }

            const payload = {
                homestay_id,
                roomName,
                check_in_date,
                check_out_date,
                total_price,
                user_name_placer: user.name,
                phone_placer: user.phone,
                user_id: user._id,
                email_user: user.email,
                total_customer,
                status: true
            }

            const result = await this._homestayBookedEntity.create(payload);
            await this._homestayEntity.update(homestay_id, { status: 'booked' });
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async editHomestayStatus(user: any, data: any) {
        try {
            const result = await this._homestayBookedEntity.updateOne({ status: 'paid' }, {}, {})
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }


}

export default HomeStayBookedComponent