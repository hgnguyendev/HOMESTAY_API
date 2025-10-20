import BaseComponent from "../../core/base-component";
import { IHomeStay } from "../../interface/homestay.interface";
import HomeStayEntity from "../entities/mongo/homestay.enrity";


class HomeStayComponent extends BaseComponent {
    private _homestayEntity = new HomeStayEntity();

    async createHomestay(data: IHomeStay) {
        try {
            const payload = {
                ...data,
                status: 'not_booked'
            }
            const result = await this._homestayEntity.create(payload);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAllHomeStay() {
        try {
            const result = await this._homestayEntity.getAll();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async editHomestay(id: string, data: IHomeStay) {
        try {
            const result = await this._homestayEntity.update(id, data);
            return result;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async deleteHomestay(id: string) {
        try {
            await this._homestayEntity.deleteOne(id)
            return this._handleSuccess('Delete Homestay successfully');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async searchHomestay(data: any) {
        const { name, address, price, limit, skip } = data;

        console.log("Received data:", data);
        console.log("Address received:", address);

        const skipNumber = parseInt(skip) || 0;
        const limitNumber = parseInt(limit) || 10;

        try {
            let filter: any = {};

            if (name && name.trim()) {
                filter.roomName = { $regex: name.trim(), $options: 'i' };
            }

            if (address && address.trim()) {
                filter.address = { $regex: address.trim(), $options: 'i' };
                console.log("Searching with address filter:", filter.address);
            }

            if (price) {
                // Xử lý price phù hợp (số hoặc range)
                const priceNum = parseInt(price);
                if (!isNaN(priceNum)) {
                    filter.price = priceNum;
                }
            }

            console.log("Final filter:", filter);

            const response = await this._homestayEntity.getAll2(filter, {}, skipNumber, limitNumber);
            const total = await this._homestayEntity.countDocuments(filter);

            console.log("Search results:", response);

            return {
                data: response,
                total
            };
        } catch (error: any) {
            console.error("Search error:", error);
            throw new Error(error.message);
        }
    }

}

export default HomeStayComponent