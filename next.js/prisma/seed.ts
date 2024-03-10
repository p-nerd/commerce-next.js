import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { TBillboard } from "@/collections/billboards";
import { TCategory } from "@/collections/categories";

const log = (message: string) => {
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

const random_index = (array: string[]) => {
    return Math.floor(Math.random() * array.length);
};

const billboards = (count = 10): TBillboard[] => {
    log(`[generate] Generating ${count} billboards...`);
    const billboards: TBillboard[] = [];
    for (let i = 0; i < count; i++) {
        const billboard: TBillboard = {
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

const categories = (count = 10, billboardIDs: string[]): TCategory[] => {
    log(`[generate] Generating ${count} categories...`);
    const categories: TCategory[] = [];
    for (let i = 0; i < count; i++) {
        const category: TCategory = {
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            billboardId: billboardIDs[random_index(billboardIDs)],
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        categories.push(category);
    }
    log(`[generate] Generated ${categories.length} categories`);
    return categories;
};

const prisma = new PrismaClient();
log(`[database] Connected to the database`);

const main = async () => {
    try {
        console.log(`-----------------------------------------------------------`);
        log(`[delete] Deleting existing records in categories table...`);
        await prisma.category.deleteMany();
        log(`[delete] Deleted records in categories table`);
        log(`[delete] Deleting existing records in billboards table...`);
        await prisma.billboard.deleteMany();
        log(`[delete] Deleted records in billboards table`);
        console.log(`-----------------------------------------------------------`);

        console.log(`-----------------------------------------------------------`);
        log(`[create] Adding new billboards data...`);
        await prisma.billboard.createMany({ data: billboards(100) });
        log(`[create] Added billboards data`);
        log(`[create] Adding new categories data...`);
        const billboardIDs = (await prisma.billboard.findMany()).map(b => b.id);
        await prisma.category.createMany({ data: categories(100, billboardIDs) });
        log(`[create] Added categories data`);
        console.log(`-----------------------------------------------------------`);
    } catch (error: any) {
        log(`[Error] ${error?.message}`);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        log(`[database] Disconnected from the database`);
    }
};

await main();
