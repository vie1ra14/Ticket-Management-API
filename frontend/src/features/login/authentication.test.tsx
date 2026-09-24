import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Login } from "./pages/Login"
import { Navbar } from "../../components/Navbar/Navbar"
import { useUser } from "../users/hooks/useUsers"
import { getUser } from "../users/api/users.api"
import { renderHook } from "@testing-library/react"
import { Login as loginRequest, Logout as logoutRequest } from "./api/login.api"

vi.mock("./api/login.api", () => ({
    Login: vi.fn(),
    Logout: vi.fn(),
}))

vi.mock("../users/api/users.api", () => ({
    getUser: vi.fn(),
    getUsers: vi.fn(),
}))

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })
}

function renderAuthUI() {
    const queryClient = createQueryClient()
    const user = userEvent.setup()
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <Navbar />
                <Login />
            </MemoryRouter>
        </QueryClientProvider>,
    )
    return user
}

describe("autenticação e navegação", () => {
    beforeEach(() => localStorage.clear())
    afterEach(() => cleanup())

    it("troca os botões da navbar imediatamente no login e logout bem-sucedidos", async () => {
        vi.mocked(loginRequest).mockResolvedValue({ access_token: "token-teste" })
        vi.mocked(logoutRequest).mockResolvedValue(204)
        const user = renderAuthUI()

        expect(screen.getByRole("navigation")).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Registrar" })).toBeInTheDocument()
        expect(screen.queryByRole("button", { name: "Sair" })).not.toBeInTheDocument()

        await user.type(screen.getByLabelText("Email"), "pessoa@example.com")
        await user.type(screen.getByLabelText("Senha"), "senha-segura")
        await user.click(screen.getAllByRole("button", { name: "Entrar" })[1])

        expect(await screen.findByRole("button", { name: "Sair" })).toBeInTheDocument()
        expect(localStorage.getItem("token")).toBe("token-teste")
        expect(screen.queryByRole("link", { name: "Registrar" })).not.toBeInTheDocument()

        await user.click(screen.getByRole("button", { name: "Sair" }))

        await waitFor(() => expect(logoutRequest).toHaveBeenCalledOnce())
        expect(await screen.findByRole("link", { name: "Registrar" })).toBeInTheDocument()
        expect(localStorage.getItem("token")).toBeNull()
    })

    it("mantém o token quando a resposta de logout não é de sucesso", async () => {
        localStorage.setItem("token", "token-atual")
        vi.mocked(logoutRequest).mockResolvedValue(401)
        const user = renderAuthUI()

        await user.click(screen.getByRole("button", { name: "Sair" }))

        await waitFor(() => expect(logoutRequest).toHaveBeenCalledOnce())
        expect(localStorage.getItem("token")).toBe("token-atual")
        expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument()
    })

    it("só busca o usuário atual quando há token de sessão", async () => {
        const queryClient = createQueryClient()
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        )
        const { result, rerender } = renderHook(() => useUser(), { wrapper })

        expect(result.current.fetchStatus).toBe("idle")
        expect(getUser).not.toHaveBeenCalled()

        localStorage.setItem("token", "token-atual")
        queryClient.setQueryData(["auth", "token"], "token-atual")
        rerender()

        await waitFor(() => expect(getUser).toHaveBeenCalledOnce())
    })
})
