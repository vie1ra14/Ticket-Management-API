import { useQuery, useQueryClient } from "@tanstack/react-query"

export const authTokenQueryKey = ["auth", "token"] as const
export const currentUserQueryKey = ["auth", "user"] as const

export function getStoredToken() {
    return localStorage.getItem("token")
}

export function useAuthToken() {
    return useQuery({
        queryKey: authTokenQueryKey,
        queryFn: getStoredToken,
        initialData: getStoredToken,
        staleTime: Infinity,
        gcTime: Infinity,
    })
}

export function useSetAuthToken() {
    const queryClient = useQueryClient()

    return (token: string | null) => {
        if (token) {
            localStorage.setItem("token", token)
        } else {
            localStorage.removeItem("token")
        }

        queryClient.setQueryData(authTokenQueryKey, token)
        queryClient.removeQueries({ queryKey: currentUserQueryKey })
    }
}
