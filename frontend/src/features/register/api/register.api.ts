import { http } from "../../../api/http"

export interface Register {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export const createUser = async ({ body }: { body: Register }) => {
    const { data } = await http.post<Register>("/auth/register", body)
    return data
}
