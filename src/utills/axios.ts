import axios from "axios";
import {REACT_APP_BASE_LOCAL_URL} from "@env"

//const baseUrl = REACT_APP_BASE_LOCAL_URL;
const baseUrl = 'http://localhost:8000';


export const axiosInstance = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
});
