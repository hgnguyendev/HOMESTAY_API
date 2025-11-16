import { resolveSoa } from "dns";
import BaseComponent from "../../core/base-component";
import EmailUtil from "../../helpers/email-util";
import { IHomestayBooked } from "../../interface/homestay_booked.interface";
import HomeStayEntity from "../entities/mongo/homestay.enrity";
import HomeStayBookedEntity from "../entities/mongo/homestay_booked.entity";

class HomeStayBookedComponent extends BaseComponent {
    private _homestayBookedEntity = new HomeStayBookedEntity();
    private _homestayEntity = new HomeStayEntity();
    private _emailUtil = new EmailUtil;

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

            const overlappingBooking = await this._homestayBookedEntity.findOne({
                homestay_id: homestay_id,
                check_in_date: { $lt: new Date(check_out_date) },
                check_out_date: { $gt: new Date(check_in_date) }
            });


            if (overlappingBooking) {
                throw new Error('Khoảng thời gian này đã có người đặt phòng');
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

    async updateBookedPaymentSuccess(user: any, txn_ref: string, data: any) {
        const { _id, status } = data;
        console.log(user)

        if (!txn_ref) {
            throw new Error('Chưa đặt phòng thành công');
        }

        try {
            const response = await this._homestayBookedEntity.updateOne(
                { txn_ref: txn_ref },
                { $set: { status: status } }
            );

            if (status === 'cancel') {
                return response;
            }

            const homestay = await this._homestayEntity.findOne({ _id: _id }, {}, {});

            const htmlEmailContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>🎉 Đặt Homestay thành công!</h2>
                <p>Xin chào <strong>${user.fullname || user.name || "Quý khách"}</strong>,</p>
                <p>Cảm ơn bạn đã đặt phòng tại hệ thống của chúng tôi.</p>

                <h3>📌 Thông tin đặt phòng:</h3>
                <ul>
                    <li><strong>Tên homestay:</strong> ${homestay?.roomName || "Không xác định"}</li>
                    <li><strong>Mã giao dịch:</strong> ${txn_ref}</li>
                    <li><strong>Trạng thái:</strong> Đã thanh toán</li>
                </ul>

                <p>Nếu bạn cần chỉnh sửa hoặc hỗ trợ thêm, hãy liên hệ ngay với chúng tôi.</p>

                <p>Chúng tôi rất mong được đón tiếp bạn!</p>
                <br>
                <p>Trân trọng,</p>
                <strong>Đội ngũ hỗ trợ Homestay</strong>
            </div>
        `;

            await this._homestayEntity.update(_id, { status: 'paid' });

            await this._emailUtil.sendEmail(
                [user.email],
                'Xác nhận đặt Homestay thành công',
                'Bạn đã đặt homestay thành công!',
                htmlEmailContent,
                null
            );

            return response;

        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    async listHomestayBooked(homestay_id: string) {
        try {
            const response = await this._homestayBookedEntity.getHomestayBooked(homestay_id);
            console.log("responsse", response)
            return response;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getHomestayBookedByUser(user: any, query: any) {
        const { status } = query;
        console.log("status",status)
        try {
            const filters = {
                user_id: user._id,
                status
            }
            const response = await this._homestayBookedEntity.getAll(filters, {}, {});
            return response;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async deleteHomestayBooked(user: any, id: string) {
        if (!user) {
            throw new Error("No User ");
        }

        if (!id) {
            throw new Error('id error');
        }
        try {
            await this._homestayBookedEntity.deleteOne(id);
            return 'delete homestay booked successfully'
        } catch (error: any) {
            throw new Error(error);
        }
    }


}

export default HomeStayBookedComponent