import axios from "axios";
import {REACT_APP_BASE_LOCAL_URL} from "@env";

const baseUrl = REACT_APP_BASE_LOCAL_URL;


export const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
});
