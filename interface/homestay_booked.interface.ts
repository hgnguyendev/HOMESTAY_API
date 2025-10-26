export interface IHomestayBooked {
    homestay_id: string;
    roomName: string;
    check_in_date: Date
    check_out_date: Date;
    total_price: number;
    user_name_placer: string;
    phone_placer: string
    user_id:string;
    status: string;
    email_user:string;
    total_customer:number
}