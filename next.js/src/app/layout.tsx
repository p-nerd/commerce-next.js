import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { dark } from "@clerk/themes";

import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin - Commerce",
};

const Layout = (p: Readonly<{ children: ReactNode }>) => {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" className="dark">
                <body className={inter.className}>
                    <Providers />
                    {p.children}
                    <Toaster position="top-right" />
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Layout;
