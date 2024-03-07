import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

export const billboards = (count = 10) => {
    const billboards = [];
    for (let i = 0; i < count; i++) {
        const billboard = {
            id: faker.string.uuid(),
            label: faker.lorem.words(2),
            imageUrl: faker.image.url(),
            status: "active",
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        billboards.push(billboard);
    }
    return billboards;
};

const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.billboard.deleteMany();
        console.log("Deleted records in billboards table");

        await prisma.billboard.createMany({
            data: billboards(100),
        });
        console.log("Added billboards data");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
