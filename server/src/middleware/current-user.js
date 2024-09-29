import jwt from "jsonwebtoken";
import { BadRequestError } from "../error/bad-request-error.js";

export const currentUser = (req, res, next) => {
    const { auth } = req.cookies

    try {
        const payload = jwt.verify(auth, "lol");
        // if (authToken != "test") throw BadRequestError("oh helll naahhh")

        req.currentUser = payload

        // req.currentUser = {
        //     id: 5,
        //     email: "admin1@example.com",
        //     phone: "9123456781",
        //     userType: "ADMIN",
        //     iat: 1727527645
        // };
    } catch (err) {
        console.log(err);
    }

    next();
};

// export const authorizeRole = (role) => {
//     return (req: Request, res:, next) => {
//         // if (req.currentUser.)
//     }
// }

