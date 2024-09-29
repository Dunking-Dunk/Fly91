import { createSlice} from '@reduxjs/toolkit'


const initialState = {
 loading:true

}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
   servicesRequest(state,action){
    return{
      loading:true
    }
   },
   servicesSuccess(state,action){
    return{
      loading:false,
      services:action.payload
    }
   },
   servicesFail(state,action){
    return{
      loading:false,
    }
   },
   myServicesRequest(state,action){
    return{
      loading:true
    }
   },
   myServicesSuccess(state,action){
    return{
      loading:false,
      services:action.payload
    }
   },
   myServicesFail(state,action){
    return{
      loading:false,
    }
   },
   serviceRequest(state,action){
    return{
      loading:true
    }
   },
   serviceSuccess(state,action){
    return{
      loading:false,
      service:action.payload
    }
   },
   serviceFail(state,action){
    return{
      loading:false,
    }
   },
   createServiceRequest(state,action){
    return{
      loading:true
    }
   },
  createServiceSuccess(state,action){
    return{
      loading:false,
      service:action.payload
    }
   },
   createServiceFail(state,action){
    return{
      loading:false,
    }
   },
   updateServiceRequest(state,action){
    return{
      loading:true
    }
   },
   updateServiceSuccess(state,action){
    return{
      loading:false,
      service:action.payload
    }
   },
   updateServiceFail(state,action){
    return{
      loading:false,
    }
   },
   deleteServiceRequest(state,action){
    return{
      loading:true
    }
   },
   deleteServiceSuccess(state,action){
    return{
      loading:false,
    }
   },
   deleteServiceFail(state,action){
    return{
      loading:false,
    }
   },
  },
 
})

// Action creators are generated for each case reducer function
const {actions,reducer}=serviceSlice;
export const {
servicesRequest,
servicesSuccess,
servicesFail,
myServicesRequest,
myServicesSuccess,myServicesFail,
serviceRequest,serviceSuccess,serviceFail,
updateServiceFail,updateServiceRequest,updateServiceSuccess,
deleteServiceRequest,deleteServiceSuccess,deleteServiceFail,
createServiceRequest,createServiceSuccess,createServiceFail
}=actions;
export default reducer;