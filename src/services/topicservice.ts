import { ITopicReq } from "../interfaces/topicInterface";
import { axiosInstance } from "../utills/axios"

export const topicByChart = async (query: ITopicReq) => {
    console.log("CALL APIS");
    
    try {
        const result =  await axiosInstance.get(`/topic?chartType=${query.chart_type}`)
        console.log("RESULT ",{result});
        
        return result
    } catch (error) {
        console.log("ERROR IN TOPIC SERVICE", error);
    }
}
