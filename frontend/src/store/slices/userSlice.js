import { createSlice} from '@reduxjs/toolkit'


const initialState = {
 loading:false,
 isLogined:true,
 isVerified:true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   loginRequest(state,action){
    return{
      loading:true
    }
   },
   loginSuccess(state,action){
    return{
      loading:false,
      isLoggined:true
    }
   },
   loginFail(state,action){
    return{
    ...state
    }
   },
   verificationRequest(state,action){
    return{
      loading:true
    }
   },
   verificationSuccess(state,action){
    return{
      loading:false,
      isLoggined:true,
      isVerified:true
    }
   },
   verificationFail(state,action){
    return{
    ...state
    }
   },
   profileRequest(state,action){
    return{
      loading:true
    }
   },
  profileSuccess(state,action){
    return{
      loading:false,
      profile:action.payload
    }
   },
   profileFail(state,action){
    return{
    ...state
    }
   }
  },
 
})

// Action creators are generated for each case reducer function
const {actions,reducer}=userSlice;
export const {
loginRequest,
loginSuccess,
loginFail,
verificationRequest,
verificationSuccess,
verificationFail,
profileRequest,
profileSuccess,
profileFail
}=actions;
export default reducer;