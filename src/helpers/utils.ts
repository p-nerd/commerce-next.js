import { toast } from "@/components/modals/toast-modal";

const utils = {
    url: (path: string): URL => new URL(path),
    copy: (text: string, toastPrefix: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${toastPrefix} copied to the clipboard.`);
    },
    number_formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
    }),
};

export default utils;
