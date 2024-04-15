import {ISignup} from '../interfaces/autInterfaces';
import {axiosInstance} from '../utills/axios';

export const signup = async (data: any) => {
  return await axiosInstance.post('/user/signup', data);
};

export const login = async (data: any) => {
  console.log('in the services', data,axiosInstance());
  return await axiosInstance.post('/user/login', data);
};

// export const login = () => {
//   try {
//   } catch (error) {}
// };
