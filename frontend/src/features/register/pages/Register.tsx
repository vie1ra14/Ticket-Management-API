import { Button, Form, Input } from "antd"
import { useCreateUser } from "../hooks/createRegister"
import styles from "./Register.module.css"
import { useNavigate } from "react-router"

type RegisterFormValues = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export function Register() {
    const { mutate: register, isPending, error } = useCreateUser()
    const navigate = useNavigate()

    const handleSubmit = async (values: RegisterFormValues) => {
        register(values, {
            onSuccess: () => {
                navigate("/login")
            },
            onError: () => {
                console.error(error)
            }
        })
    }

    return (
        <Form<RegisterFormValues>
            className={styles.register}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
        >
            <Form.Item
                label="Usuário"
                name="name"
                rules={[{ required: true, message: "Informe seu usuário." }]}
            >
                <Input placeholder="Seu usuário" autoComplete="username" />
            </Form.Item>
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
                <Input.Password placeholder="Crie uma senha" autoComplete="new-password" />
            </Form.Item>
            <Form.Item
                label="Confirmar senha"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                    { required: true, message: "Confirme sua senha." },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error("As senhas não coincidem."))
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Repita sua senha" autoComplete="new-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
                Criar conta
            </Button>
        </Form>
    )
}
