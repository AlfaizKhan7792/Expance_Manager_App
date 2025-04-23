import {toast} from "react-toastify"
import axios from "axios"

const API_URL = "https://expance-manager-app.onrender.com"

export const Login = async (formData) =>{
    try {
        const res = await axios.post(`${API_URL}/api/user/login` , formData)
    localStorage.setItem("user" , JSON.stringify(res.data))
    return res.data
    } catch (error) {
        toast.error(error)
    }
}

export const Register = async (formData) =>{
    try {
        const res = await axios.post(`${API_URL}/api/user/register` , formData)
    localStorage.setItem("user" , JSON.stringify(res.data))
    return res.data
    } catch (error) {
        toast.error(error)
    }
}