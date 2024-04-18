import axios from "axios";
import { REACT_APP_BASE_LOCAL_URL } from "@env"

console.log({ REACT_APP_BASE_LOCAL_URL });


// console.log({ REACT_APP_BASE_LOCAL_URL });

export const axiosInstance = axios.create({
  baseURL: `http://192.168.0.102:8000/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  }
});
