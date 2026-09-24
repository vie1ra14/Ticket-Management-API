import { Navigate, Outlet } from "react-router";
import { useUser } from "../features/users/hooks/useUsers";
import { useAuthToken } from "../features/login/hooks/useAuthSession";

export function ProtectRoute() {
    const { data: token } = useAuthToken()
    const { data: user, isLoading, isError } = useUser()

    if (!token) {
        return <Navigate to={"/login"} replace />
    }

    if (isLoading) {
        return <p>Verificando acesso...</p>
    }

    if (isError || !user) {
        return <Navigate to={"/login"} replace />
    }

    if (user.role !== "admin") {
        return <Navigate to={"/"} replace />
    }

    return <Outlet />
}
