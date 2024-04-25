import { IContentReq } from "../interfaces/contentInterface";
import { axiosInstance } from "../utills/axios"

export const contentByTopic = async (query: IContentReq) => {
    try {
        return await axiosInstance.get(`/content?topicId=${query.topic_id}`)
    } catch (error) {
        console.log("ERROR IN Content SERVICE", error);
    }
}

