import { useUsers } from "../hooks/useUsers";

export function UsersPage() {
    const {
        data: users = [],
        isLoading,
        error
    } = useUsers()

    if(isLoading) {
        return <div>carregando...</div>
    }

    if(error) {
        return <div>Erro ao carregar usuários</div>
    }

    return (
        <div>
            {users.map(user => user.email)}
        </div>
    )
}
