import axios from 'axios';
import {ISignup} from '../interfaces/autInterfaces';
import {axiosInstance} from '../utills/axios';

export const signup = async (data: ISignup) => {
  return await v.post('/auth/signup', data);
};

export const login = () => {
  try {
  } catch (error) {}
};

export const getQuizQuestions = async ({quizType}) => {
  let response = await axios.get(
    `http://localhost:8000/api/v1/quiz?quizType=${quizType}`,
  );
  return response;
};