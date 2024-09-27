import { configureStore } from "@reduxjs/toolkit"
import { user } from "./reducer/userReducer"
import { service } from "./reducer/serviceReducer"

export const store = configureStore({
    reducer: {
        user,
        service
    }
})