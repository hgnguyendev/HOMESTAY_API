import BaseComponent from "../../core/base-component";
import CommentsEntity from "../entities/mongo/comments.entity";
import HomeStayEntity from "../entities/mongo/homestay.enrity";


class CommentsComponent extends BaseComponent {
    private _commentsEntity = new CommentsEntity();
    private _homestayEntity = new HomeStayEntity();

    async createComments(user: any, data: any) {
        console.log("user", user)
        const { room_id, comment, images, rating } = data
        try {
            const dataComments = {
                user_id: user._id,
                name: user.name,
                room_id,
                comment,
                images,
                rating
            }
            const result = await this._commentsEntity.create(dataComments);
            const stats = await this._commentsEntity.getAll(
                { room_id },
                {},
                { sort: { createAt: -1 } }
            )
            const totalReviews = stats.length;
            const avgRating =
                totalReviews > 0
                    ? stats.reduce((sum: any, item: any) => sum + (item.rating || 0), 0) / totalReviews
                    : 0;
            const dataRating = {
                rating: avgRating
            }
            await this._homestayEntity.update(
                room_id,
                dataRating
            );

            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getComments(room_id: string) {
        try {
            const result = await this._commentsEntity.getAll({ room_id: room_id }, {}, { sort: { createdAt: -1 } });
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default CommentsComponent;