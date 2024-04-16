import axios from 'axios';
import {ISignup} from '../interfaces/autInterfaces';
import {axiosInstance} from '../utills/axios';

export const signup = async (data: any) => {
  try {
    console.log('in the auth serivecs', data, axiosInstance);
    return await axiosInstance.post('/user/signup', data);
  } catch (error) {
    console.log('error in create---', error);
  }
};

export const login = async (data: any) => {
  try {
    console.log('in the auth serivecs', data, axiosInstance);
    console.log(await axiosInstance.post('/user/login', data));
    //const  axios.post('http://localhost:8000/api/v1/user/login')
    return await axiosInstance.post('/user/login', data);
  } catch (error) {
    console.log('error in login---', error);
  }
};

// export const login = async (data: any) => {
//   try {
//     console.log('in the auth service');
//     // Make a POST request to the login endpoint
//     const response = await axios.post(
//       'http://10.0.2.2:8000/api/v1/user/login',
//       data,
//     );

//     // Handle the response, such as storing user data in Redux store or navigating to the home screen
//     console.log('Login successful:', response.data);

//     // Return the response data if needed
//     return response.data;
//   } catch (error) {
//     // Handle errors, such as displaying error messages or logging errors
//     console.error('Error in login:', error.message);

//     // Throw the error again to propagate it to the caller if needed
//     throw error;
//   }
// };
