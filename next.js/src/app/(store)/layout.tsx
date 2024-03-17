import { Container } from "@/components/ui2/container";
import type { ReactNode } from "react";

const Navbar = () => {
    return (
        <nav className="border-b">
            <Container>Nav</Container>
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
