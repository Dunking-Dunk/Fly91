import api from "@/config/api";

export const verifyEmail = async (body) => {
    const { data } = await api.post('/login', body)
    console.log(data)
    return data
}