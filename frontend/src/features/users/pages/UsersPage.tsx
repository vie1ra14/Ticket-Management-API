import { useUsers } from "../hooks/useUsers"

export function UsersPage() {
    const { data: users = [], isLoading, error } = useUsers()

    if (isLoading) {
        return <p>Carregando usuários...</p>
    }

    if (error) {
        return <p>Não foi possível carregar os usuários.</p>
    }

    return (
        <div>
            <h1>Usuários</h1>

            {users.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.email} - {user.role}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
