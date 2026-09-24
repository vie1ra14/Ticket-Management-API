import { useQuery } from "@tanstack/react-query"
import { getUser, getUsers, type User } from "../api/users.api"
import { currentUserQueryKey, useAuthToken } from "../../login/hooks/useAuthSession"

export function useUsers() {
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getUsers
    })
}

export function useUser() {
    const { data: token } = useAuthToken()

    return useQuery<User>({
        queryKey: currentUserQueryKey,
        queryFn: getUser,
        enabled: Boolean(token),
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}
