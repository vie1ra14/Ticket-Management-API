import { useQuery } from "@tanstack/react-query"
import { getUsers, type User } from "../api/users.api"

export function useUsers() {
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getUsers
    })
}
