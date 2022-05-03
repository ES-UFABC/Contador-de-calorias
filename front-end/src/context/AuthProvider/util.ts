import { Api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user:IUser|null){
    localStorage.setItem('u',JSON.stringify(user));
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('u');

    if(!json){
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest(userName:string,password:string){
    const data = {
        userName,
        password,
    };
    try{
        //const request = await Api.post('api/auth/v1/signin',data);
        const request = await Api.post('verifyUsername',data);
        localStorage.setItem('userName',userName);
        localStorage.setItem('token',request.data.token);
        return request.data;
    }catch(error){
        return null;
    }
}

export async function RegisterRequest(userName:string,password:string,
    height:number,weight:number,gender:string){
    const data = {
        userName,
        password,
        height,
        weight,
        gender
    };
    try{
        const request = await Api.post('register',data);

        return request.data;
    }catch(error){
        return null;
    }
}