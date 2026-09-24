import axios from "axios"

export const http = axios.create({
    baseURL: "http://26.44.109.76:8000/api/v1"
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
