import { ISignup } from "../interfaces/autInterfaces";
import { axiosInstance } from "../utills/axios"

export const signup = async(data:ISignup) => {
    return await axiosInstance.post("/auth/signup" ,data);
}

export const login = () => {
    try {

    } catch (error) {

    }
}