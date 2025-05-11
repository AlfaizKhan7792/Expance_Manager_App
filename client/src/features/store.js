import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth/AuthSlice"
import Trans from "./Transaction/TransSlice"
import Admin from "./Admin/AdminSlice"

const store = configureStore({
    reducer : {
Auth,
Trans,
Admin,
    }
})


export default store