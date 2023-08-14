import axios from "axios";
import { errorToast } from "./toastify.service";

const LOCAL_SERVER_URL=import.meta.env.VITE_SERVER_URL;
const token=localStorage.getItem('jwt');  

//post data for login signup
export const postData=async(url:string, data:any)=>{
    try {
        const response=await axios.post(`${LOCAL_SERVER_URL}/${url}`, data);
        return response.data;
        
    } catch (error:any) {
        errorToast(error.response.data.message);
    }

}

//getData
export const getData=async(url:string)=>{
    try {
        const response=await axios.get(`${LOCAL_SERVER_URL}/${url}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data;
        
    } catch (error:any) {
        errorToast(error.response.data.message);
        
    }}

    //delete
    export const deleteData=async(url:string)=>{
        try {
            const response=await axios.delete(`${LOCAL_SERVER_URL}/${url}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return response.data;
        } catch (error:any) {
            errorToast(error.response.data.message);
        }
    
    }

    //post data with headers
    export const postDataWithHeaders=async(url:string, data:any)=>{
        try {
            const response=await axios.post(`${LOCAL_SERVER_URL}/${url}`, data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return response.data;
            
        } catch (error:any) {
            errorToast(error.response.data.message);
        }
    
    }


    //getData with headers
    export const getDataWithHeaders=async(url:string)=>{
        try {
            const response=await axios.get(`${LOCAL_SERVER_URL}/${url}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return response.data;
            
        } catch (error:any) {
            errorToast(error.response.data.message);
        }
    
    }
    
      //patch data with headers
      export const patchDataWithHeaders=async(url:string, data:any)=>{
        try {
            const response=await axios.patch(`${LOCAL_SERVER_URL}/${url}`, data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return response.data;
            
        } catch (error:any) {
            errorToast(error.response.data.message);
        }
    
    }
