import axios from 'axios';
import {axiosInstance} from '../utills/axios';

const temp='http://localhost:8000/api/v1'
export const fetchWords = async query => {
  try {
    const result = await axiosInstance.get(`/dictionary?query=${query}`);
    // const result=axios.get(`http://localhost:8000/api/v1/dictionary?query=${query}`)
    return result;
  } catch (error) {
    console.log('ERROR IN WORDS FETCHING', error);
  }
};
export const fetchWordOfTheDay = async () => {
  try {
    const result = await axiosInstance.get(`/dictionary/word-of-the-day`);

    return result;
  } catch (error) {
    console.log('ERROR IN WORD OF THE DAY  SERVICE', error);
  }
};

export const fetchDefinition = async (id: string) => {
  try {
    const result = await axiosInstance.get(`/dictionary/definition?id=${id}`);

    return result;
  } catch (error) {
    console.log('ERROR IN DEFINITION SERVICE', error);
  }
};
