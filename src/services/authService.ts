import { ISignup } from '../interfaces/autInterfaces';
import {axiosInstance} from '../utills/axios';

export const signup = async (name: string | ISignup, email: string | undefined, phone_number: string | undefined, password: string | undefined) => {
  try {
    const data = { name, email, phone_number, password };
    let response= await axiosInstance.post('/user/signup', data);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const login = async (email: string | undefined, password: string | undefined) => {
  try {
    const data = {  email, password }; 
    const response= await axiosInstance.post('/user/login', data);
    return response.data;
  } catch (error) {
    console.log('error in login---', error);
    throw error;
  }
};

export const updateUser = async (token: string,name: string | ISignup, email: string | undefined, phone_number: string | undefined) => {
  try {
    const data = { name, email, phone_number };
    console.log("data in services keshav",data,token);
    const response = await axiosInstance.put('/user/update', data, {
      headers: {
       "x-access-token": `${token}`,
      },
    });
    console.log("response---",response);
    return response.data;
  } catch (error) {
    console.log('error in upadte user---', error);
    throw error;
  }
};
export const updateUserAndPassword = async (token: string,name: string | ISignup, email: string | undefined, phone_number: string | undefined,password: string | undefined) => {
  try {
    const data = { name, email, phone_number,password };
    console.log("data in services keshav",data,token);
    const response = await axiosInstance.put('/user/update', data, {
      headers: {
       "x-access-token": `${token}`, 
      },
    });
    console.log("response---",response);
    return response.data;
  } catch (error) {
    console.log('error in upadte user---', error);
    throw error;
  }
};