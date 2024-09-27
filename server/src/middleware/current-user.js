import jwt from 'jsonwebtoken'
 
export const currentUser = (req, res, next) => {
    if (!req.cookies.token) {
        return next()
    }

    try {
        const payload = jwt.verify(req.cookies.token, process.env.JWT_KEY)

        req.currentUser = payload;
    }
    catch (err) {
        console.log(err)
            }

    next()
}

// export const authorizeRole = (role) => {
//     return (req: Request, res:, next) => { 
//         // if (req.currentUser.)
//     }
// }