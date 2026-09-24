import { useState, type MouseEvent } from "react"
import  styles  from "./Login.module.css"
import axios from "axios"

export function Login () {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const response = await axios.post("http://localhost:3333/users", {
            email,
            password
        })

        return response
    }

    return (
        <form action="http://localhost:3333/users" method="POST" className={styles.login}>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="digite o seu email"
                required
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                name="password"
                id="password"
                placeholder="digite sua senha"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={(e) => handleSubmit(e)}
            >
                login
            </button>
        </form>
    )
}
