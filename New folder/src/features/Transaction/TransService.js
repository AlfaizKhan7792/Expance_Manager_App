import axios from "axios"

const API_URL = "/api/trans"

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
// console.log(response.data);
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
    const response = await axios.get(`/api/trans/user-data` , options)
    localStorage.setItem("Auth" , JSON.stringify(response.data))
    console.log(response.data);
    return await response.data
    } catch (error) {
        console.log(error);
    }
}

// Update Transaction
export const update = async (id , token) =>{
    let options = {
        headers : {
authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${id}` , options)
    localStorage.setItem("Auth" , JSON.stringify(response.data))
    return await response.data
}
