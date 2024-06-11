import axios from 'axios';
import {axiosInstance} from '../utills/axios';

export const signup = async (name: string | undefined, email: string | undefined, phone_number: string | undefined, password: string | undefined) => {
  try {
    const data = { name, email, phone_number, password };
    let response= await axiosInstance.post('/user/signup', data);
    return response.data;
  } catch (error:any) {
    console.error('Error in signup:', error);
    throw error;
  }
};

export const signupWithGoogle = async (name: string | undefined, email: string | undefined, password: string | undefined,profile_picture:string | undefined) => {
  try {
    const data = { name, email, password,profile_picture };
    let response= await axiosInstance.post('/user/signup/google', data);
    return response.data;
  } catch (error:any) {
    console.error('Error in signup:', error);
    throw error;
  }
};

export const login = async (email: string | undefined, password: string | undefined) => {
  try {
    const data = {  email, password }; 
    console.log("data in login auth services----",data);
    const response= await axiosInstance.post('/user/login', data);
    return response.data;
  } catch (error:any) {
    console.error('Error in login:', error);
     throw error;
  }
};

export const updateUser = async (
  token: string,
  updatedFields: { name?: string, email?: string, phone_number?: string, password?: string }
) => {
  try {
    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, value]) => value !== undefined)
    );
    const response = await axiosInstance.put('/user/update', filteredFields, {
      headers: {
        "x-access-token": `${token}`,
      },
    });
    return response.data;
  } catch (error:any) {
    console.error('Error updating user:', error);
    throw error; 
  }
};
