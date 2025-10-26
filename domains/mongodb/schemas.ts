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
    },
    {
        timestamps: true
    }
).pre('save', (next: any) => {
    next();
})

const HOMESTAY_BOOKED = new Schema(
    {
        homestay_id: String,
        roomName: String,
        check_in_date: Date,
        check_out_date: Date,
        total_price: Number,
        user_name_placer: String,
        phone_placer: String,
        status: String,
        user_id: String,
        email_user: String,
        total_customer: Number
    },
    {
        timestamps: true
    }
).pre('save', (next: any) => {
    next();
})

const PAYMENT = new Schema({
    orderId: String,
    userId: String,
    amount: Number,
    currency: String,
    paymentMethod: String,
    txnRef: String,
    responseCode: String,
    status: String,
    paymentDate: Date,
}, {
    timestamps: true
})

export const SCHEMAS = {
    USERS,
    OTP_CODES,
    BO_USERS,
    HOMESTAY,
    HOMESTAY_BOOKED,
    PAYMENT
}