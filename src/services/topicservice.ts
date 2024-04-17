import { ITopicReq } from "../interfaces/topicInterface";
import { axiosInstance } from "../utills/axios"

export const topicByChart = async (query: ITopicReq) => {
    // console.log({axiosInstance});

    try {
        // const data = await axiosInstance.get(`/topic?chartType=${query.chart_type}`);
        return await axiosInstance.get('/topic?chartType=line')
    } catch (error) {
        console.log("ERROR IN TOPIC SERVICE", error);
    }

}


// export const contentByChart = async (query: ITopicReq) => {
//     return await axiosInstance.get(`/content?page=${query.page}&limit=${query.limit}&chartType=${query.chart_type}`);
// }
