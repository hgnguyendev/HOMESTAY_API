import BoUserComponent from "../components/bo-users.component";
import HomeStayBookedComponent from "../components/homestay-booked.component";
import HomeStayComponent from "../components/homestay.component";
import OtpComponent from "../components/otp.component";
import OtpForgotPassWordComponent from "../components/otpForgotPassWord.component";
import PaymentComponent from "../components/payment.component";
import UsersComponent from "../components/users.component";

class Facade {
    private _userComponent = new UsersComponent();
    private _boUserComponent = new BoUserComponent();
    private _otpComponent = new OtpComponent();
    private _homestayComponent = new HomeStayComponent();
    private _homestayBookedComponent = new HomeStayBookedComponent();
    private _paymentComponent = new PaymentComponent();
    private _otpForgotPassWordComponent = new OtpForgotPassWordComponent();
    createUser(data: any) {
        return this._userComponent.createUser(data);
    }

    editUser(data: any, user: any) {
        return this._userComponent.editUser(data, user);
    }

    getUserInfo(data: any) {
        return this._userComponent.getUserInfo(data);
    }

    getAllUser(){
        return this._userComponent.getAllUser();
    }

    deleteUser(id:string){
        return this._userComponent.deleteUser(id);
    }

    verifyToken(token: string) {
        return this._userComponent.verifyToken(token);
    }

    createOtp(data: any) {
        return this._otpComponent.createOtp(data);
    }

    CheckOtpRegister(data:any){
        return this._otpComponent.checkOtpRegister(data);
    }

    getUserBoInfo(user: any) {
        return this._boUserComponent.getUserBoInfo(user)
    }

    verifyTokenBo(token: string) {
        return this._boUserComponent.verifyTokenBo(token)
    }


    //Homestay Component
    createHomestay(data: any) {
        return this._homestayComponent.createHomestay(data);
    }

    getAllHomeStay(data: any) {
        return this._homestayComponent.getAllHomeStay(data)
    }

    deleteHomestay(id: any) {
        return this._homestayComponent.deleteHomestay(id)
    }

    editHomestay(id: any, data: any) {
        return this._homestayComponent.editHomestay(id, data)
    }

    searchHomeStay(data: any) {
        return this._homestayComponent.searchHomestay(data);
    }

    //Homestay booked

    createHomestayBooked(user: any, data: any) {
        return this._homestayBookedComponent.createHomestayBooked(user, data)
    }

    //payment 
    createPayment(data: any, ip: string, user: any) {
        return this._paymentComponent.createPayment(data, ip, user);
    }

    paymentResult(data: any) {
        return this._paymentComponent.handleIpn(data);
    }

    //otp

    //otp forgot password
    RenderOtpForgotPassWord(data: any) {
        return this._otpForgotPassWordComponent.renderOtpForgotPassword(data);
    }

    CheckOtp(data:any){
       return this._otpForgotPassWordComponent.CheckOtp(data) 
    }

}

export default new Facade();