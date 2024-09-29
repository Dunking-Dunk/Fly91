import prisma from '../src/db/prismaClient.js'; // Assuming the code you provided is saved here
import { describe, it } from 'mocha';

// Mock the Prisma client using Sinon
const mockPrisma = {
    user: {
        findUnique(_) {
            return {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
            };
        },
    },
};

// Example of using the mocked Prisma client in a test
describe('Prisma Mock Example', () => {
    it('should return mocked user', async () => {
        const user = mockPrisma.user.findUnique({ where: { id: 1 } });
    });
});
