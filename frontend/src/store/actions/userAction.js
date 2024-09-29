import axios from "axios";
import { loginFail, loginRequest, loginSuccess, verificationFail, verificationRequest, verificationSuccess,profileRequest,profileSuccess,profileFail } from "../slices/userSlice";
export const login=(email)=>async(dispatch)=>{
    try {
        dispatch(loginRequest())
        await axios.post("/login",{email})
        dispatch(loginSuccess())

    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}
export const verify=(otp)=>async(dispatch)=>{
    try {
        dispatch(verificationRequest())
        await axios.post("/verify",{otp})
        dispatch(verificationSuccess())

    } catch (error) {
        dispatch(verificationFail(error.response.data.message))
    }
}
export const myProfile=()=>async(dispatch)=>{
    try {
        console.log("profile dispatched")
        dispatch(profileRequest())
        const {data}=await axios.get("http://localhost:8000/profile?employeeID=FLY91-0001")
        console.log(data?.[0])
        dispatch(profileSuccess(data?.[0]))

    } catch (error) {
        dispatch(profileFail(error.response.data.message))
    }
}