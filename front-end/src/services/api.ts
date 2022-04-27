import axios from 'axios'
import { getUserLocalStorage } from '../context/AuthProvider/util';

export const Api = axios.create({
    //baseURL: "https://localhost:5001",
    baseURL: "https://contadordecalorias.msbcapistrano.repl.co",
});

Api.interceptors.request.use(
    (config)=>{
        const user = getUserLocalStorage();

        config.headers!.Authorization = user?.token;

        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);