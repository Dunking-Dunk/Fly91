import sinon from 'sinon';
import prisma from '../src/db/prismaClient.js'; // Assuming the code you provided is saved here

// Mock the Prisma client using Sinon
///** @param {import("sinon").stub} **/
const mockPrisma = {
    user: {
        findUnique() {
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
        // Replace the real Prisma client with the mock
        sinon.replace(prisma, 'user', mockPrisma.user);

        const user = await prisma.user.findUnique({ where: { id: 1 } });

        // Test if the mocked result is returned
        console.log(user); // Output: { id: 1, name: 'John Doe', email: 'john.doe@example.com' }

        sinon.restore(); // Restore the original Prisma client methods
    });
});
