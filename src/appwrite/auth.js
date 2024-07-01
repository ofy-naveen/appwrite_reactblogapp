import {Client,Account,ID} from "appwrite"
import conf from "../conf/conf";
import toast from "react-hot-toast";


export class AuthService{

    client;
    account;

    constructor(){
        this.client = new Client()
                            .setEndpoint(conf.appwriteUrl)
                            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password,name}){

        try {
            const userAccount = await this.account.create(
                ID.unique(),
                'email',
                'password'
            )
            if(userAccount){
                //call another method
            }
            else{
                return userAccount;
            }
        } catch (error) {
            toast.error("account creation failed. please try again");
        }

    }

    async logIn({email,password}){
       try {
        return await this.account.createEmailPasswordSession(email, password)
       } catch (error) {
        toast.error("logIn failed")
       }
    }

    async  getCurrentStatus(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: hetCurrentUser :: error",error)
        }
        return null;
    }

    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            
        }
    }

}

const authService = new AuthService();

export default authService;