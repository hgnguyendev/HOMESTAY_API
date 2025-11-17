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

    async getAllHomeStay(data: any) {
        try {
            const {
                limit = 2,
                page = 1,
                address,
                minPrice,
                maxPrice,
                startDate,
                endDate,
            } = data;

            const filter: any = {};

            if (address) {
                filter.address = { $regex: address, $options: "i" };
            }

            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }

            if (startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);

                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);

                filter.createdAt = {
                    $gte: start,
                    $lte: end,
                };
            }

            const limitNum = Number(limit) || 10;
            const skip = (Number(page) - 1) * limitNum;

            const [result, total] = await Promise.all([
                this._homestayEntity.getAll2(filter, {}, skip, limitNum),
                this._homestayEntity.countDocuments(filter),
            ]);

            return {
                data: result,
                total,
                page: Number(page),
                limit: limitNum,
            };

        } catch (error: any) {
            console.error("getAllHomeStay error:", error);
            throw new Error(error.message);
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
        const { name, address, price, limit, skip, startDate, endDate } = data;
        console.log("search", data);

        const skipNumber = parseInt(skip) || 0;
        const limitNumber = parseInt(limit) || 10;

        try {
            let filter: any = {};

            if (name && name.trim()) {
                filter.roomName = { $regex: name.trim(), $options: 'i' };
            }

            if (address && address.trim()) {
                filter.address = { $regex: address.trim(), $options: 'i' };
            }

            if (price) {
                const priceNum = parseInt(price);
                if (!isNaN(priceNum)) {
                    filter.price = priceNum;
                }
            }

            if (startDate || endDate) {
                const start = startDate ? new Date(startDate) : new Date(0);
                start.setHours(0, 0, 0, 0);

                const end = endDate ? new Date(endDate) : new Date();
                end.setHours(23, 59, 59, 999);

                filter.createdAt = { $gte: start, $lte: end };
            }


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

    async getHomestayFeatured() {
        try {
            const responsse = await this._homestayEntity.getFeatured(5);
            return responsse;
        } catch (error: any) {
            throw new Error(error);
        }
    }

}

export default HomeStayComponent