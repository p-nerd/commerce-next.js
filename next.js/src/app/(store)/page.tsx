import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
    title: "Home - Commerce",
};

const Home = () => {
    return (
        <div className="flex items-center justify-center">
            <Link href="/admin" className="underline">
                Go to Admin
            </Link>
        </div>
    );
};

export default Home;
