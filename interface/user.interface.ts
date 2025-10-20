export interface IUser {
    _id: string,
    name: string,
    address:string,
    email: string,
    phone: string,
    role: 'admin' | 'user',
    password: string,
}