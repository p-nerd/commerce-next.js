"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DeleteStore = () => {
    return (
        <>
            <Button variant="destructive" size="sm" onClick={() => { }}>
                <Trash className="h-4 w-4" />
            </Button>
        </>
    );
};

export default DeleteStore;
