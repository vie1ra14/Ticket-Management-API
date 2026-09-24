import { http } from "../../../api/http"
import type { UserRole } from "../../../routes/ProtectRoute"

export interface User {
    id: number
    email: string
    password?: string
    role: UserRole
}

export const getUsers = async () => {
    const { data } = await http.get<User[]>("/users")
    return data
}

export const getUser = async () => {
    const { data } = await http.get<User>(`/auth/me`)
    return data
}

// export const createUser = async (user: unknown) => {
//     const { data } = await http.post("/users", user)
//     return data
// }

// export const updateUser = async (id: string, user: unknown) => {
//     const { data } = await http.put(`/users/${id}`, user)
//     return data
// }

// export const deleteUser = async (id: string) => {
//     const { data } = await http.delete(`/users/${id}`)
//     return data
// }
