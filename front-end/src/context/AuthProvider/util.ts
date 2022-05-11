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
        const request = await Api.post('verifyUsername',data);
        localStorage.setItem('userName',userName);
        localStorage.setItem('token',request.data.token);
        return request.data;
    }catch(error){
        return null;
    }
}

export async function RegisterRequest(userName:string,password:string,age:number,
    height:number,weight:number,gender:string){
    const data = {
        userName,
        password,
        age,
        height,
        weight,
        gender
    };
    //console.log(JSON.stringify(data, null, 2))
    try{
        const request = await Api.post('register',data);

        return request.data;
    }catch(error){
        return null;
    }
}

export async function setUserData(userName:string,password:string,age:number,
    height:number,weight:number,gender:string,token:string|null){
    const data = {
        userName,
        password,
        age,
        height,
        weight,
        gender,
        token
    };
    console.log(JSON.stringify(data, null, 2))
    try{
        const request = await Api.post('setUserData',data);

        return request.data;
    }catch(error){
        return null;
    }
}