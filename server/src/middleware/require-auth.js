import { NotAuthorizedError } from "../error/not-authorized-error.js";

export const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError()
    }
    next()
}