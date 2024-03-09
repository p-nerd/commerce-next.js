import { toast } from "@/components/modals/toast-modal";

const utils = {
    url: (path: string): URL => new URL(path),
    copy: (text: string, toastPrefix: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${toastPrefix} copied to the clipboard.`);
    },
};

export default utils;
