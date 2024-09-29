import { expect } from 'chai';
import sinon from 'sinon';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { sendEmailRequest } from '../src/business_logic/login.js';
import { BadRequestError } from '../src/error/bad-request-error.js';
import { NotFoundError } from '../src/error/not-found-error.js'; // Import as needed
import { describe, beforeEach, it, afterEach } from 'mocha';

describe('sendEmailRequest', function () {
    let prismaMock, resendMock;

    beforeEach(function () {
        // Mock PrismaClient
        prismaMock = {
            user: {
                findUnique: sinon.stub(),
            },
            otp: {
                findFirst: sinon.stub(),
                create: sinon.stub(),
                delete: sinon.stub(),
            },
        };

        // Mock Resend
        resendMock = {
            emails: {
                send: sinon.stub(),
            },
        };
    });

    it('should throw NotFoundError if user is not found', async function () {
        prismaMock.user.findUnique.resolves(null);

        try {
            await sendEmailRequest('test@example.com', prismaMock, resendMock);
            expect.fail('Expected NotFoundError to be thrown');
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError);
        }
    });

    it('should delete existing OTP if found', async function () {
        const user = { id: 1 };
        const existingOtp = { id: 1, userId: 1 };

        prismaMock.user.findUnique.resolves(user);
        prismaMock.otp.findFirst.resolves(existingOtp);
        prismaMock.otp.delete.resolves();

        await sendEmailRequest('test@example.com', prismaMock, resendMock);

        sinon.assert.calledWith(prismaMock.otp.delete, {
            where: {
                userId: user.id,
            },
        });
    });

    it('should create a new OTP if no existing OTP is found', async function () {
        const user = { id: 1 };

        prismaMock.user.findUnique.resolves(user);
        prismaMock.otp.findFirst.resolves(null);
        prismaMock.otp.create.resolves({
            userId: user.id,
            otp: '123456',
            expiresAt: new Date(),
        });

        await sendEmailRequest('test@example.com', prismaMock, resendMock);

        sinon.assert.calledOnce(prismaMock.otp.create);
        sinon.assert.calledWith(prismaMock.otp.create, {
            data: {
                userId: user.id,
                otp: sinon.match.string,
                expiresAt: sinon.match.instanceOf(Date),
            },
        });
    });

    it('should send an email with OTP', async function () {
        const user = { id: 1 };

        prismaMock.user.findUnique.resolves(user);
        prismaMock.otp.findFirst.resolves(null);
        prismaMock.otp.create.resolves({
            userId: user.id,
            otp: '123456',
            expiresAt: new Date(),
        });
        resendMock.emails.send.resolves();

        await sendEmailRequest('test@example.com', prismaMock, resendMock);

        sinon.assert.calledOnce(resendMock.emails.send);
        sinon.assert.calledWith(resendMock.emails.send, {
            from: 'onboarding@resend.dev',
            to: 'sivaram.asdf@gmail.com',
            subject: 'Hello World',
            html: sinon.match.string, // Matches any string (OTP)
        });
    });

    it('should throw BadRequestError if OTP creation fails', async function () {
        const user = { id: 1 };

        prismaMock.user.findUnique.resolves(user);
        prismaMock.otp.findFirst.resolves(null);
        prismaMock.otp.create.rejects(new Error('Creation error'));

        try {
            await sendEmailRequest('test@example.com', prismaMock, resendMock);
            expect.fail('Expected BadRequestError to be thrown');
        } catch (error) {
            expect(error).to.be.instanceOf(BadRequestError);
        }
    });

    afterEach(function () {
        sinon.restore();
    });
});
