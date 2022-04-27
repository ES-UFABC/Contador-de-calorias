export interface IUser{
    userName?: string;
    token?: string;
}

export interface IContext extends IUser{
    authenticate: (userName:string,password:string)=>Promise<void>;
    logout: () => void;
}

export interface IAuthProvider{
    children:JSX.Element;
}
