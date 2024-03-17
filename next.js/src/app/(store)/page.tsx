import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
    title: "Commerce",
};

const Home = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <Link href="/admin" className="underline">
                Go to Admin
            </Link>
        </div>
    );
};

export default Home;
