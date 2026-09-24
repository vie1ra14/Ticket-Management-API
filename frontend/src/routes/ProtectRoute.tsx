import { Navigate, Outlet } from "react-router";
import { useUser } from "../features/users/hooks/useUsers";
import { useAuthToken } from "../features/login/hooks/useAuthSession";

export type UserRole = "admin" | "agent" | "user"

type ProtectRouteProps = {
    allowedRoles?: UserRole[]
}

export function ProtectRoute({ allowedRoles }: ProtectRouteProps) {
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

    const isAdmin = user.role === "admin"
    const roleIsAllowed = allowedRoles === undefined || allowedRoles.includes(user.role as UserRole)

    if(!isAdmin && !roleIsAllowed) {
        return <Navigate to={"/"} replace />
    }

    return <Outlet />
}
