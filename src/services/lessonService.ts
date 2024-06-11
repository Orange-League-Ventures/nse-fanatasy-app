import {axiosInstance} from '../utills/axios';

export const fetchLessons= async () => {
  try {
    const result = await axiosInstance.get(`/lesson`);
    console.log(result,'resultjbskdbsd');
    
    return result;
  } catch (error) {
    console.log('ERROR IN Lesson  SERVICE', error);
  }
};


