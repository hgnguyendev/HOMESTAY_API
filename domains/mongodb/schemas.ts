import mongoose from "mongoose";

const { Schema } = mongoose;

const USERS = new Schema(
    {
        _id: String,
        name: String,
        email: String,
        phone: String,
        org_id: String,
        status: String,
        role: String,
        password: String,
        user_id: String,
        connect_device: Boolean,
        tokens: Array,
    },
    {
        timestamps: true
    }
)

const BO_USERS = new Schema(
    {
        _id: String,
        name: String,
        email: String,
        role: String
    }
)

const OTP_CODES = new Schema(
    {
        _id: String,
        code: Number,
        email: String
    }
)

const HOMESTAY = new Schema(
    {
        roomName: String,
        roomAcreage: String,
        roomType: String,
        price: Number,
        images: Array,
        description: String,
        amenities: Array,
        status: String,
        address: String
    }
)

export const SCHEMAS = {
    USERS,
    OTP_CODES,
    BO_USERS,
    HOMESTAY
}