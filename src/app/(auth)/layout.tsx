import { ReactNode } from "react";

const AuthLayout = (p: { children: ReactNode }) => {
    return <div className="flex h-full flex-col items-center justify-center">{p.children}</div>;
};

export default AuthLayout;
