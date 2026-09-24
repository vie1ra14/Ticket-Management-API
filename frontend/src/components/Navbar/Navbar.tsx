import { Link } from "react-router"
import { Button } from "antd"

import styles from "./Navbar.module.css"

import { useLogout } from "../../features/login/hook/useLogin"
import { useAuthToken } from "../../features/login/hooks/useAuthSession"

export function Navbar () {
    const { data: token } = useAuthToken()
    const { mutate: logout, isPending: isLoggingOut } = useLogout()

    return (
        <div className={styles.navbar}>

            <div className={styles.logo}>
                <Link className={styles.link} to="/">
                    Logo
                </Link>
            </div>

            <h2 className={styles.title}>
                <Link className={styles.link} to="/admin">
                    Ticket-Manager
                </Link>
            </h2>

            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li>
                        {token ? (
                            <Button type="primary" loading={isLoggingOut} onClick={() => logout ()}>
                                Sair
                            </Button>
                        ) : (
                            <Link className={styles.link} to="/login">
                                <Button type="primary">Entrar</Button>
                            </Link>
                        )}
                    </li>
                    <li>
                        {
                            !token && <Link
                                className={styles.link}
                                to="/register"
                            >
                                <Button>
                                    Register
                                </Button>
                            </Link>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}
