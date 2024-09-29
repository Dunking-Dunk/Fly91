import { expect } from 'chai';
import sinon from 'sinon';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { sendEmailRequest } from '../src/business_logic/login.js'; // Update with correct path
import { BadRequestError } from '../src/error/bad-request-error.js';
import { describe, beforeEach, it, afterEach } from 'mocha';

describe('sendEmailRequest', function () {
    let prismaMock, resendMock;

    beforeEach(function () {
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

        resendMock = {
            emails: {
                send: sinon.stub(),
            },
        };
    });

    it('should delete existing OTP if present', async function () {
        const user = { id: 1 };
        const otp = { id: 123, userId: 1 };
        prismaMock.user.findUnique.resolves(user);
        prismaMock.otp.findFirst.resolves(otp);
        prismaMock.otp.delete.resolves();

        await sendEmailRequest('test@example.com', prismaMock, resendMock);

        sinon.assert.calledWith(prismaMock.otp.delete, {
            where: {
                userId: user.id,
            },
        });
    });

    it('should create a new OTP and send email', async function () {
        const user = { id: 1 };
        prismaMock.user.findUnique.resolves(user);
        prismaMock.otp.findFirst.resolves(null);
        prismaMock.otp.create.resolves();
        resendMock.emails.send.resolves();

        await sendEmailRequest('test@example.com', prismaMock, resendMock);

        sinon.assert.calledOnce(prismaMock.otp.create);
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
