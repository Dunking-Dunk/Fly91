import axios from "axios";
import { loginFail, loginRequest, loginSuccess, verificationFail, verificationRequest, verificationSuccess } from "../slices/userSlice";
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
export const profile=()=>async(dispatch)=>{
    try {
        dispatch(profileRequest())
        await axios.post("/profile")
        dispatch(profileSuccess())

    } catch (error) {
        dispatch(profileFail(error.response.data.message))
    }
}