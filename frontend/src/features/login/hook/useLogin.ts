import { useMutation } from "@tanstack/react-query"
import { Login, Logout, type LoginBody } from "../api/login.api"
import { useSetAuthToken } from "../hooks/useAuthSession"

export const useLogin = () => {
    const setAuthToken = useSetAuthToken()

    return useMutation({
        mutationFn: (body: LoginBody) => Login({ body }),
        onSuccess: ({ access_token }) => setAuthToken(access_token),
    })
}

export const useLogout = () => {
    const setAuthToken = useSetAuthToken()

    return useMutation({
        mutationFn: Logout,
        onSuccess: (status) => {
            if (status >= 200 && status < 300) {
                setAuthToken(null)
            }
        }
    })
}
