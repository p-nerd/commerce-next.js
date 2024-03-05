import { UserButton } from "@clerk/nextjs";

import stores from "@/collections/stores";
import StoreSwitcher from "./StoreSwitcher";
import MainNav from "./MainNav";

const Navbar = async () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher stores={await stores.finds()} />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
