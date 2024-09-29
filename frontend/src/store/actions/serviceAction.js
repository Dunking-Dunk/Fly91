import axios from "axios"
import { createServiceFail, createServiceRequest, createServiceSuccess, deleteServiceFail, deleteServiceRequest, deleteServiceSuccess, myServicesFail, myServicesRequest, myServicesSuccess, serviceFail, serviceRequest, servicesFail, servicesRequest, servicesSuccess, serviceSuccess, updateServiceFail, updateServiceRequest, updateServiceSuccess } from "../slices/serviceSlice"
export const getAllRequestes=()=>async(dispatch)=>{
try {
    dispatch(servicesRequest())
    const services=axios.get("/admin/services")
    dispatch(servicesSuccess(services))
} catch (error) {
    dispatch(servicesFail(error.response.data.message))
}
}
export const getMyRequestes=()=>async(dispatch)=>{
    try {
        dispatch(myServicesRequest())
        const services=axios.get("/myservices")
        dispatch(myServicesSuccess(services))
    } catch (error) {
        dispatch(myServicesFail(error.response.data.message))
    }
}
export const createRequest=()=>async(dispatch)=>{
    try {
       dispatch(createServiceRequest())
       axios.delete(`/employee/request/${id}`)
        dispatch(createServiceSuccess())
    } catch (error) {
        dispatch(createServiceFail(error.response.data.message))
    }
}
export const getRequest=(id)=>async(dispatch)=>{
    try {
        dispatch(serviceRequest())
        const services=axios.get(`/employee/request/${id}`)
        dispatch(serviceSuccess(services))
    } catch (error) {
        dispatch(serviceFail(error.response.data.message))
    }
}

export const updateRequest=()=>async(dispatch)=>{
    try {
        dispatch(updateServiceRequest())
        const services=axios.push(`/employee/request/${id}`)
        dispatch(updateServiceSuccess(services))
    } catch (error) {
        dispatch(updateServiceFail(error.response.data.message))
    }
}
export const deleteRequest=()=>async(dispatch)=>{
    try {
        dispatch(deleteServiceRequest())
       axios.delete(`/employee/request/${id}`)
        dispatch(deleteServiceSuccess())
    } catch (error) {
        dispatch(deleteServiceFail(error.response.data.message))
    }
}
