import Link from "next/link";

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
