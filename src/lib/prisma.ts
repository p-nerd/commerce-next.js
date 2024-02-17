import { PrismaClient } from "@prisma/client";

let _prisma: PrismaClient | null = null;

const prisma = () => {
    if (!_prisma) {
        _prisma = new PrismaClient();
    }
    return _prisma;
};

export { prisma };
