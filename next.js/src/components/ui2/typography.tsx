import { CopyIcon, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy } from "./typography2";

export const Heading = (p: { title: string; description: string }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{p.title}</h2>
            <p className="text-sm text-muted-foreground">{p.description}</p>
        </div>
    );
};

export const APIAlert = ({
    variant = "public",
    ...p
}: {
    title: string;
    code: string;
    variant: "public" | "admin";
}) => {
    return (
        <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2">
                {p.title}
                <Badge
                    className="capitalize"
                    variant={variant === "admin" ? "destructive" : "secondary"}
                >
                    {variant}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {p.code}
                </code>
                <Copy text={p.code} toastPrefix="API Route">
                    <CopyIcon />
                </Copy>
            </AlertDescription>
        </Alert>
    );
};
