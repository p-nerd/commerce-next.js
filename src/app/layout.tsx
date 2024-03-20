import "./globals.css";

import type { ReactNode } from "react";

import { dark } from "@clerk/themes";

import { Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Providers from "./Providers";

const font = Urbanist({ subsets: ["latin"] });

const Layout = (p: Readonly<{ children: ReactNode }>) => {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" className="dark">
                <body className={font.className}>
                    <Providers />
                    {p.children}
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Layout;
