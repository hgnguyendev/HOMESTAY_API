import BoUserComponent from "../components/bo-users.component";
import HomeStayBookedComponent from "../components/homestay-booked.component";
import HomeStayComponent from "../components/homestay.component";
import OtpComponent from "../components/otp.component";
import UsersComponent from "../components/users.component";

class Facade {
    private _userComponent = new UsersComponent();
    private _boUserComponent = new BoUserComponent();
    private _otpComponent = new OtpComponent();
    private _homestayComponent = new HomeStayComponent();
    private _homestayBookedComponent = new HomeStayBookedComponent();

    createUser(data: any) {
        return this._userComponent.createUser(data);
    }

    getUserInfo(data: any) {
        return this._userComponent.getUserInfo(data)
    }

    verifyToken(token: string) {
        return this._userComponent.verifyToken(token);
    }

    createOtp(data: any) {
        return this._otpComponent.createOtp(data);
    }

    getUserBoInfo(user: any) {
        return this._boUserComponent.getUserBoInfo(user)
    }

    verifyTokenBo(token: string) {
        return this._boUserComponent.verifyTokenBo(token)
    }


    //Homestay Component
    createHomestay(data:any){
        return this._homestayComponent.createHomestay(data);
    }

    getAllHomeStay(){
        return this._homestayComponent.getAllHomeStay()
    }

    deleteHomestay(id:any){
        return this._homestayComponent.deleteHomestay(id)
    }

    editHomestay(id:any,data:any){
        return this._homestayComponent.editHomestay(id,data)
    }

    searchHomeStay(data:any){
        return this._homestayComponent.searchHomestay(data);
    }

    //Homestay booked

    createHomestayBooked(user:any,data:any){
        return this._homestayBookedComponent.createHomestayBooked(user,data)
    }

}

export default new Facade();