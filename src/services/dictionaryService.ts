import { axiosInstance } from "../utills/axios"

export const fetchWords = async () => {
    try {
        const result = await axiosInstance.get(`/dictionary`)
        return result
    } catch (error) {
        console.log("ERROR IN WORDS FETCHING", error);
    }
}

export const fetchWordOfTheDay = async () => {
    try {
        const result = await axiosInstance.get(`/dictionary/word-of-the-day`)
        return result
    } catch (error) {
        console.log("ERROR IN WORD OF THE DAY  SERVICE", error);
    }
}

export const fetchDefinition = async (id:string) => {
    try {
        const result = await axiosInstance.get(`/dictionary/definition?id=${id}`)

        return result
    } catch (error) {
        console.log("ERROR IN DEFINITION SERVICE", error);
    }
}

