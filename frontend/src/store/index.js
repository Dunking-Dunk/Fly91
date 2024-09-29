import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import serviceReducer from "./slices/serviceSlice"
const reducer=combineReducers({
    userState:userReducer,
    serviceState:serviceReducer

  })
const store = configureStore({
 reducer
})
export default store;