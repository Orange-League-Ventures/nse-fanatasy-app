import { ISignup } from '../interfaces/autInterfaces';
import {axiosInstance} from '../utills/axios';

export const signup = async (name: string | ISignup, email: string | undefined, phone_number: string | undefined, password: string | undefined) => {
  try {
    const data = { name, email, phone_number, password };
    let response= await axiosInstance.post('/user/signup', data);
    return response.data;
  } catch (error:any) {
    console.error('Error in signup:', error);
    if (error?.response) {
      console.error('Server responded with status code:', error?.response?.status);
      console.error('Response data:', error?.response?.data);
      throw new Error(error?.response?.data); // Throw custom error message
    } else if (error.request) {
      console.error('No response received from the server');
      throw new Error('No response received from the server');
    } else {
      console.error('Error setting up the request:', error?.message);
      throw new Error(error?.message);
    }
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
    if (error?.response) {
      console.error('Server responded with status code:', error?.response?.status);
      console.error('Response data:', error?.response?.data);
      throw new Error(error?.response?.data); // Throw custom error message
    } else if (error.request) {
      console.error('No response received from the server');
      throw new Error('No response received from the server');
    } else {
      console.error('Error setting up the request:', error?.message);
      throw new Error(error?.message);
    }
  }
};

export const updateUser = async (
  token: string,
  updatedFields: { name?: string, email?: string, phone_number?: string, password?: string }
) => {
  try {
    console.log("data in services ", updatedFields);
    const filteredFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([_, value]) => value !== undefined)
    );
    console.log("data in services", filteredFields, token);
    const response = await axiosInstance.put('/user/update', filteredFields, {
      headers: {
        "x-access-token": `${token}`,
      },
    });
    console.log("response---", response);
    return response.data;
  } catch (error:any) {
    console.error('Error updating user:', error);
    if (error?.response) {
      console.error('Server responded with status code:', error?.response?.status);
      console.error('Response data:', error?.response?.data);
      throw new Error(error?.response?.data); // Throw custom error message
    } else if (error.request) {
      console.error('No response received from the server');
      throw new Error('No response received from the server');
    } else {
      console.error('Error setting up the request:', error?.message);
      throw new Error(error?.message);
    }

    throw error; 
  }
};
