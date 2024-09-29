import prisma from '../db/prismaClient.js';
import { BadRequestError } from '../error/bad-request-error.js';

import jwt from 'jsonwebtoken';

/**
 * send email request
 * @param {import("@prisma/client").PrismaClient}  prisma
 * @param {string}  otp
 * @returns {Promise<string>} returns authentication token if otp is valid, else throws
 **/
async function verifyOtp(otp, prisma) {
    const result = await prisma.otp.findFirst({
        where: {
            otp: otp,
        },
    });
    if (!result) {
        throw new BadRequestError();
    }

    const user = await prisma.user.findUnique({
        where: {
            id: result.userId,
        },
    });

    await prisma.otp.delete({
        where: {
            userId: user.id,
        },
    });

    const token = jwt.sign(user, process.env.JWT_KEY, { algorithm: 'HS256' });
    return token;
}

/**
 * @param {string} jawt
 * @param {string} signingKey
 **/

function verifyJwt(jawt, signingKey) {
    const payload = jwt.verify(jawt, signingKey);
    return payload;
}

import 'dotenv';
const jawt = await verifyOtp('873394', prisma);
verifyJwt(jawt, process.env.JWT_KEY);
