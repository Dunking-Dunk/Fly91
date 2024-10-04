import { useMutation } from "react-query";

import { verifyEmail } from "../action/authAction";

export function useVerifyEmail() {
    return useMutation({
        mutationFn: verifyEmail
    })
}