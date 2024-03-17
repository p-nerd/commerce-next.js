import type { ReactNode } from "react";

import { Container } from "@/components/ui2/container";

import categories from "@/collections/categories";

import Link from "next/link";
import Links from "./Links";
import Cart from "./Cart";

const Navbar = async () => {
    const categoriesList = await categories.findsWithoutBillboard();
    return (
        <nav className="border-b">
            <Container className="relative flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold">
                    Commerce
                </Link>
                <Links categories={categoriesList.map(({ name, id }) => ({ name, id }))} />
                <div className="flex w-full justify-end">
                    <Cart />
                </div>
            </Container>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="py-10 text-center">&copy; Commerce, Inc. All rights reserved.</div>
        </footer>
    );
};

const StoreLayout = (p: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            <Navbar />
            {p.children}
            <Footer />
        </>
    );
};

export default StoreLayout;
