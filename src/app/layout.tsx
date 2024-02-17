import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ModelProviders } from "@/providers/model-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard - Commerce",
};

const Layout = (p: Readonly<{ children: ReactNode }>) => {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" className="dark">
                <body className={inter.className}>
                    <ModelProviders />

                    {p.children}
                </body>
            </html>
        </ClerkProvider>
    );
};

export default Layout;
