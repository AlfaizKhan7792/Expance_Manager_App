import axios from "axios"

const API_URL = "https://expance-manager-app.onrender.com/api/admin"

const FetchAllUsers = async (token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(`${API_URL}/all-users`, options)
        return response.data
    } catch (error) {
        console.log("Users Not Fetched : ", error)
    }
}


const FetchAllTrans = async (token) =>{
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/all-trans`, options)
    return response.data
}


const AdminReducer = {FetchAllUsers , FetchAllTrans}
export default AdminReducer