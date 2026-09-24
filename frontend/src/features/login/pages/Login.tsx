import { Alert, Button, Form, Input } from "antd"
import styles from "./Login.module.css"
import { useLogin } from "../hook/useLogin"
import { useNavigate } from "react-router"

type LoginFormValues = {
    email: string
    password: string
}

export function Login() {
    const { mutate: login, isPending, error } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = ({ email, password }: LoginFormValues) => {
        login({ email, password }, {
            onSuccess: () => {
                navigate("/")
            },
        })
    }

    return (
        <Form<LoginFormValues>
            className={styles.login}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Informe seu email." },
                    { type: "email", message: "Informe um email válido." },
                ]}
            >
                <Input type="email" placeholder="seu@email.com" autoComplete="email" />
            </Form.Item>
            <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: "Informe sua senha." }]}
            >
                <Input.Password placeholder="Sua senha" autoComplete="current-password" />
            </Form.Item>
            {error && <Alert type="error" showIcon message="Não foi possível realizar o login." />}
            <Button type="primary" htmlType="submit" loading={isPending} block>
                Entrar
            </Button>
        </Form>
    )
}
