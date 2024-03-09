import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const log = message => {
    const max_len = 10;

    const split = message.split("] ");
    const tag = split[0];
    const space_len = max_len - tag.length;

    let spaces = "";
    for (let i = 0; i < space_len; i++) {
        spaces += " ";
    }

    console.log(`${tag}]${spaces}${split[1]}`);
};

const billboards = (count = 10) => {
    log(`[generate] Generating ${count} billboards...`);
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
    log(`[generate] Generated ${billboards.length} billboards`);
    return billboards;
};

const prisma = new PrismaClient();
log(`[database] Connected to the database`);

try {
    log(`[delete] Deleting existing records in billboards table...`);
    await prisma.billboard.deleteMany();
    log(`[delete] Deleted records in billboards table`);

    log(`[create] Adding new billboards data...`);
    await prisma.billboard.createMany({ data: billboards(100) });
    log(`[create] Added billboards data`);
} catch (error) {
    log(`[Error]`, error);
    process.exit(1);
} finally {
    await prisma.$disconnect();
    log(`[database] Disconnected from the database`);
}
