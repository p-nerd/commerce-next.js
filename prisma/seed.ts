import type { Image, Billboard, Category, Color, Product, Size } from "@prisma/client";

import { faker } from "@faker-js/faker";
import { prisma } from "@/lib/prisma";

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

const random = <T>(array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

const billboards = (count = 10): Billboard[] => {
    log(`[generate] Generating ${count} billboards...`);
    const billboards: Billboard[] = [];
    for (let i = 0; i < count; i++) {
        const billboard: Billboard = {
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

const categories = (count = 10, billboardIDs: string[]): Category[] => {
    log(`[generate] Generating ${count} categories...`);
    const categories: Category[] = [];
    for (let i = 0; i < count; i++) {
        const category: Category = {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            description: faker.lorem.words(),
            billboardId: random(billboardIDs),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        categories.push(category);
    }
    log(`[generate] Generated ${categories.length} categories`);
    return categories;
};

const sizes = (count = 10): Size[] => {
    log(`[generate] Generating ${count} sizes...`);
    const sizes: Size[] = [];
    const sizeValues = ["m", "l", "xl", "2xl", "3xl"];
    for (let i = 0; i < count; i++) {
        const sizeValue = random(sizeValues);
        const size: Size = {
            id: faker.string.uuid(),
            name: sizeValue.toUpperCase(),
            value: sizeValue,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        sizes.push(size);
    }
    log(`[generate] Generated ${sizes.length} sizes`);
    return sizes;
};

const colors = (count = 10): Color[] => {
    log(`[generate] Generating ${count} colors...`);
    const colors: Color[] = [];
    const sizeValues = ["red", "green", "yellow", "blue"];
    for (let i = 0; i < count; i++) {
        const colorValue = random(sizeValues);
        const color: Color = {
            id: faker.string.uuid(),
            name: colorValue.toUpperCase(),
            value: colorValue,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        colors.push(color);
    }
    log(`[generate] Generated ${colors.length} colors`);
    return colors;
};

const products = (
    count = 10,
    categoryIDs: string[],
    sizeIDs: string[],
    colorIDs: string[],
): Product[] => {
    log(`[generate] Generating ${count} products...`);
    const products: Product[] = [];
    for (let i = 0; i < count; i++) {
        const product: Product = {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            price: random([10.99, 11.99, 20.99, 1.99, 100.99]),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            categoryId: random(categoryIDs),
            sizeId: random(sizeIDs),
            colorId: random(colorIDs),
            isFeatured: false,
            isArchived: false,
        };
        products.push(product);
    }
    log(`[generate] Generated ${products.length} products`);
    return products;
};

const images = (count = 10, productIDs: string[]): Image[] => {
    log(`[generate] Generating ${count} images...`);
    const images: Image[] = [];
    for (let i = 0; i < count; i++) {
        const image: Image = {
            id: faker.string.uuid(),
            name: faker.lorem.word(),
            path: faker.image.url(),
            productId: random(productIDs),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        };
        images.push(image);
    }
    log(`[generate] Generated ${images.length} images`);
    return images;
};

log(`[database] Connected to the database`);

const main = async () => {
    try {
        console.log(`-----------------------------------------------------------`);

        log(`[delete] Deleting existing records in images table...`);
        await prisma().image.deleteMany();
        log(`[delete] Deleted records in images table`);

        log(`[delete] Deleting existing records in products table...`);
        await prisma().product.deleteMany();
        log(`[delete] Deleted records in products table`);

        log(`[delete] Deleting existing records in categories table...`);
        await prisma().category.deleteMany();
        log(`[delete] Deleted records in categories table`);

        log(`[delete] Deleting existing records in billboards table...`);
        await prisma().billboard.deleteMany();
        log(`[delete] Deleted records in billboards table`);

        log(`[delete] Deleting existing records in sizes table...`);
        await prisma().size.deleteMany();
        log(`[delete] Deleted records in sizes table`);

        log(`[delete] Deleting existing records in colors table...`);
        await prisma().color.deleteMany();
        log(`[delete] Deleted records in colors table`);

        console.log(`-----------------------------------------------------------`);

        console.log(`-----------------------------------------------------------`);

        log(`[create] Adding new billboards data...`);
        await prisma().billboard.createMany({ data: billboards(10) });
        log(`[create] Added billboards data`);

        log(`[create] Adding new categories data...`);
        const billboardIDs = (await prisma().billboard.findMany()).map(b => b.id);
        await prisma().category.createMany({ data: categories(6, billboardIDs) });
        log(`[create] Added categories data`);

        log(`[create] Adding new sizes data...`);
        await prisma().size.createMany({ data: sizes(100) });
        log(`[create] Added sizes data`);

        log(`[create] Adding new colors data...`);
        await prisma().color.createMany({ data: colors(10) });
        log(`[create] Added colors data`);

        log(`[create] Adding new products data...`);
        const categoryIDs = (await prisma().category.findMany()).map(x => x.id);
        const sizeIDs = (await prisma().size.findMany()).map(x => x.id);
        const colorIDs = (await prisma().color.findMany()).map(x => x.id);
        await prisma().product.createMany({ data: products(100, categoryIDs, sizeIDs, colorIDs) });
        log(`[create] Added products data`);

        log(`[create] Adding new images data...`);
        const productIDs = (await prisma().product.findMany()).map(x => x.id);
        await prisma().image.createMany({ data: images(300, productIDs) });
        log(`[create] Added images data`);

        console.log(`-----------------------------------------------------------`);
    } catch (error: any) {
        log(`[Error] ${error?.message}`);
        process.exit(1);
    } finally {
        await prisma().$disconnect();
        log(`[database] Disconnected from the database`);
    }
};

await main();
