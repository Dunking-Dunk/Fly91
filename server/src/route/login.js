import express from "express";
import { NotFoundError } from "../error/not-found-error.js";
import { BadRequestError } from "../error/bad-request-error.js";


import jwt from "jsonwebtoken"

import prisma from "../db/prismaClient.js";
import resend from "../mail/mail.js"

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new BadRequestError()
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });



        if (!user) {
            throw new NotFoundError();
        }
        
        const resss = await prisma.otp.findFirst({
            where: {
                userId: user.id
            }
        })
        if (resss) {
            await prisma.otp.delete({
                where: {
                    userId: user.id
                }
            })
        }

        const genOtp = (otpLength) => () => {
            let otp = '';
            for (let i = 0; i < otpLength; i++) {
                otp += Math.floor(Math.random() * 10);
            }
            return otp;
        };


        const otp = genOtp(6)();

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        try {
            const otpEntry = await prisma.otp.create({
                data: {
                    userId: user.id,
                    otp: otp,
                    expiresAt: expiresAt,
                },
            });

        } catch (erorr) {
            throw new BadRequestError("whoosh")
        }

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'sivaram.asdf@gmail.com',
            subject: 'Hello World',
            html: `${otp}`
        });


        return res
            .status(200)
            .json({ message: "OK", error: {} });
    } catch (error) {
        console.error("Error creating OTP:", error);
        next(error)
    }
});

export default router;

router.post("/verify", async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            throw new BadRequestError()
        }

        const result = await prisma.otp.findFirst({
            where: {
                otp: otp
            }
        })
        if (!result) {
            throw new BadRequestError()
        }

        const user = await prisma.user.findUnique({
            where: {
                id: result.userId
            }
        })

        await prisma.otp.delete({
            where: {
                userId: user.id
            }
        })

        const token = jwt.sign(user, process.env.JWT_KEY, { algorithm: "HS256" })


        return res.status(200)
            .cookie("auth", `${token}`, { httpOnly: true })
            .send("OKOK")


    } catch (error) {
        console.error("Error authenticating:", error);
        throw new BadRequestError();
    }
})
