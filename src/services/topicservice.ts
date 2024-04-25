import { ITopicReq } from "../interfaces/topicInterface";
import { axiosInstance } from "../utills/axios"

export const topicsByLessonId = async (query: ITopicReq) => {    
    try {
        const result =  await axiosInstance.get(`/topic?lesson_id=${query.lesson_id}`)        
        return result
    } catch (error) {
        console.log("ERROR IN TOPIC SERVICE", error);
    }
}


export const contentByTopicId= async (query: any) => {    
    try {
        const result =  await axiosInstance.get(`/topic/content?topic_id=${query.topic_id}`)        
        return result
    } catch (error) {
        console.log("ERROR IN TOPIC SERVICE", error);
    }
}