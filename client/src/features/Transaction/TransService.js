import axios from "axios"

const API_URL = "https://expance-manager-app.onrender.com/api/trans"

// Add Transaction
export const Add = async (finalData , token) =>{
    // console.log(token);
const options = {
    headers : {
        authorization : `Bearer ${token}`
    }
}
const response = await axios.post(API_URL , finalData , options)
localStorage.setItem("Auth" , JSON.stringify(response.data))
return await response.data
}


// Get All Transactions
export const FetchTrans = async (token) =>{
    try {
        // console.log(token);
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`$${API_URL}/user-data` , options)
    localStorage.setItem("Auth" , JSON.stringify(response.data))
    // console.log(response.data);
    return await response.data
    } catch (error) {
        console.log(error);
    }
}

// Update Transaction
const update = async (id, updateDate, token) =>{
    const options = {
        headers : {
authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${id}`, updateDate, options)
    // localStorage.setItem("Auth" , JSON.stringify(response.data))
    return await response.data
}


// Remove Transaction
export const deleteTransaction = async (id , token) =>{
    console.log(id, "sdjf;sakdfjoij");
    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/${id}`, options)
    return await response.data
}

const transService = {deleteTransaction, update}
export default transService

