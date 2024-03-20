"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
    return (
        <Button className="flex gap-1 rounded-full" size="sm">
            <ShoppingBag size={20} />
            <span className="text-base">0</span>
        </Button>
    );
};

export default Cart;
