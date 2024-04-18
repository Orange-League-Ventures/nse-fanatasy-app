import axios from "axios";
import { REACT_APP_BASE_LOCAL_URL } from "@env"

console.log({ REACT_APP_BASE_LOCAL_URL });


const baseUrl = REACT_APP_BASE_LOCAL_URL;

console.log({ baseUrl });

export const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  }
});