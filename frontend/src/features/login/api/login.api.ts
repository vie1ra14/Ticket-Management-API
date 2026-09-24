import { http } from "../../../api/http"

export interface LoginBody {
    email: string
    password: string
}

export interface LoginResponse {
    access_token: string
}

export const Login = async ({ body }: { body: LoginBody }) => {
    const { data } = await http.post<LoginResponse>("/auth/login", body)
    return data
}

export const Logout = async () => {
    const { status } = await http.post("/auth/logout")
    return status
}
