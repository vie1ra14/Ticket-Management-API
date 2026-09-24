import { createBrowserRouter } from "react-router"

import { UsersPage } from "../features/users/pages/UsersPage"
import { Register } from "../features/register/pages/Register"
import { Login } from "../features/login/pages/Login"
import { Home } from "../features/home/pages/Home"
import { Admin } from "../features/admin/pages/Admin"
import App from "../App"
import { ProtectRoute } from "./ProtectRoute"

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/users",
                element: <UsersPage />
            },

            // PROTECT ROUTES
            {
                element: <ProtectRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <Admin />
                    }
                ]
            }
        ]
    }
])
