import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth/AuthSlice"
import Trans from "./Transaction/TransSlice"

const store = configureStore({
    reducer : {
Auth,
Trans,
    }
})


export default store