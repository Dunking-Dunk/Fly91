import { configureStore } from "@reduxjs/toolkit"
import { service } from "./reducer/serviceReducer"

export const store = configureStore({
    reducer: {
        service
    }
})