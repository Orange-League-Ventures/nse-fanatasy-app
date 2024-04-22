import {axiosInstance} from '../utills/axios';

export const UpdateReport = async ({score, quizType, userId}) => {
  try {
    return await axiosInstance.post('/report', {
      result: score,
      quizId: quizType,
      userId: userId,
    });
  } catch (error) {
    console.log('ERROR IN Content SERVICE', error);
  }
};

export const getQuestionsBasedOnQuizType = async (quizType: string) => {
  try {
    const result = await axiosInstance.get(`/quiz?quizType=${quizType}`);

    return result;
  } catch (error) {
    console.log('ERROR IN GETTING QUESTIONS', error);
  }
};

export const getQuestionBasedOnQuestionId = async (currentQuizId: string) => {
    try {
      const result = await axiosInstance.get(`/question?quizId=${currentQuizId}`);
  
      return result;
    } catch (error) {
      console.log('ERROR IN QUESTION', error);
    }
  };
