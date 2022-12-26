import axios from "axios";


export const getAxios = () =>{
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return axiosInstance;
}