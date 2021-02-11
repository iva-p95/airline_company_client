import {Type} from '../models/usertype';

export class User {
    username!:string;
    password!:string;
    userType!:Type;

    /*constructor(username:string, password:string, userType:UserType){
        this.username=username;
        this.password=password;
        this.userType=userType;
    } */
}