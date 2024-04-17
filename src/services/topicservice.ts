import { ITopicReq } from "../interfaces/topicInterface";
import { axiosInstance } from "../utills/axios"

export const topicByChart = async (query: ITopicReq) => {
    try {
        return await axiosInstance.get(`/topic?chartType=${query.chart_type}`)
    } catch (error) {
        console.log("ERROR IN TOPIC SERVICE", error);
    }
}
