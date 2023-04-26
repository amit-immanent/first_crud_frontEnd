import axios from 'axios'
import {BASE_URL1} from './config'
import { toast } from 'react-toastify';


export const login = async(email, password)=>{
    try {
        console.log(BASE_URL1,"ff");
        const data = await axios.post(`${BASE_URL1}/login`,{email, password})
            return data.data
    } catch (error) {
        console.log(error);
    }
}

export const signup = async(name, email, phone,password)=>{
    try {
        const data = await axios.post(`${BASE_URL1}/signup`,{name, email, phone,password})
        return data.data
    } catch (error) {
        console.log(error);
        if(error){
            toast.error(error?.response?.data?.error?.message)
        }
    }
}

export const getAllUsers = async()=>{
    try {
        const data =  await axios.get(`${BASE_URL1}/getAllUsers`)
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const removeUser = async(id)=>{
    try {
        console.log(id,"in api function");
        const data = await axios.delete(`${BASE_URL1}/removeUser`,{data: {id}})
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async(data1)=>{
    try {
        const data =  await axios.patch(`${BASE_URL1}/updateUser`,{data1})
        return data.data
    } catch (error) {
        console.log(error);
    }
}