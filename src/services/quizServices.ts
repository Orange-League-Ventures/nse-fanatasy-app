import {axiosInstance} from '../utills/axios';
import moment from 'moment';

interface IProps{
    score:any;
    quizType:any;
    userId:any;
    quizId:any;
}
export const UpdateReport = async ({score, quizId, userId}:IProps) => {

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
    const milliseconds = '000';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };
  const date=getCurrentDateTime();
  
  try {
    return await axiosInstance.post('/report', {
      result: score,
      quizId: quizId,
      userId: userId,
      date:date,
    });
  } catch (error) {
    console.log('ERROR IN Content SERVICE', error);
  }
};

export const getScoresForLastSevenDays=async(props:any)=>{
  
  try{
    const today = moment().startOf('day');
    const sevenDaysAgo = moment().subtract(6, 'days').startOf('day');
    
    const scores = [];
    
    // Loop through each day from seven days ago to today
    for (let date = moment(sevenDaysAgo); date.isSameOrBefore(today); date.add(1, 'day')) {
      const utcDate = moment.utc(date);
  const localDate = utcDate.local();
  const formattedDate = localDate.format("YYYY-MM-DD HH:mm:ss.SSS");
      
      // Make a request for each day
      const result = await axiosInstance.get(`/report?quiz_id=${props.quizId}&user_id=${props.userId}&date=${formattedDate}`);
      
      // Extract score for the day and push it to the scores array
      const dayOfWeek = date.format('ddd'); 
      scores.push({
        day: dayOfWeek,
        score: result.data.score
      });
    }
    
    return scores;
  }catch(error){
    console.log('ERROR IN GETTING Scores', error);
  }
}

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

  export const getAllQuizIds=async()=>{
    try {
      const result = await axiosInstance.get(`/quiz/getAllIds`);
      
      return result;
    } catch (error) {
      console.log('ERROR IN QUESTION', error);
    }
  }