import { getAxios } from "../utils/axios";


export const getDivisions = async (page = 1, limit = 5) => {
    try{
        const axios = getAxios();
        const response = await axios(`/divisiones?page=${page}&limit=${limit}`);
        
        if(!response.data.status){
            throw new Error(response.data.message);
        }
        return response.data.data;
        
    }catch(error){
        console.error(error);
    }
}


export const createDivision = async ({
    data
}) => {
    try{
        const axios = getAxios();
        const response = await axios.post(`/divisiones`, data);
        
        if(!response.data.status){
            throw new Error(response.data.message);
        }
        return true;
        
    }catch(error){
        console.error(error);
    }
}

