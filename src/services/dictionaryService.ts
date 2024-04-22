import {axiosInstance} from '../utills/axios';

export const fetchWords = async query => {
  try {
    const result = await axiosInstance.get(`/dictionary?query=${query}`);
    console.log('Result--->', result);
    return result;
  } catch (error) {
    console.log('ERROR IN WORDS FETCHING', error);
  }
};

export const fetchWordOfTheDay = async () => {
  try {
    const result = await axiosInstance.get(`/dictionary/word-of-the-day`);
    console.log('Result', result);

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
