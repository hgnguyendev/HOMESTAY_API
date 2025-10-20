export interface IImage {
    image: string;  // URL của ảnh
}

export interface IAmenity {
    amenity: string;  // ID hoặc tên tiện nghi
}

// Khai báo kiểu trạng thái bằng string literal union
export type BookingStatus = 'booked' | 'not_booked';

export interface IHomeStay {
    roomName: string;
    roomAcreage: string;
    roomType: string;
    price: number;
    images: IImage[];
    description: string;
    amenities: IAmenity[];
    status: BookingStatus;
    address:string;
}
