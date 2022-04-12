import React,{createContext, useEffect, useState} from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({children}:IAuthProvider)=>{
    const [user,setUser] = useState<IUser|null>();

    useEffect(()=>{
        const user = getUserLocalStorage()

        if(user){
            setUser(user);
        }
    },[])

    async function authenticate(userName:string,password:string){
        const response = await LoginRequest(userName,password);

        const payload = {token:response.token,userName}

        setUser(payload);
        setUserLocalStorage(payload);
    }

    async function logout(){
        setUser(null);
        setUserLocalStorage(null);
    }

    return(
        <AuthContext.Provider value={{...user,authenticate,logout}}>
            {children}
        </AuthContext.Provider>
    )
}