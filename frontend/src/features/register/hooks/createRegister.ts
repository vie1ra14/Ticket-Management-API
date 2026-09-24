import { useMutation } from "@tanstack/react-query"
import { createUser, type Register } from "../api/register.api"

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (body: Register) => createUser({body})
    })
}
