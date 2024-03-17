import { Button } from "@/components/ui/button";
import { Link, Head } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <div className="flex h-screen items-center justify-center">
                <Link href="/admin">
                    <Button>Go to Admin</Button>
                </Link>
            </div>
        </>
    );
};

export default Home;
