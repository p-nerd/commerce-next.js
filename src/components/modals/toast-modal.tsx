import type { ExternalToast } from "sonner";

import { toast as t } from "sonner";

import { Toaster } from "@/components/ui/sonner";

const buildToast = (
    caller: (message: string, options: ExternalToast) => void,
    message: string,
    description?: string,
    actionLabel?: string,
    actionOnClick?: () => void,
) => {
    const options: ExternalToast = {};
    if (description) {
        options.description = description;
    }
    if (actionLabel && actionOnClick) {
        options.action = {
            label: actionLabel,
            onClick: actionOnClick,
        };
    }
    caller(message, options);
};

type TToastFunc = (
    message: string,
    description?: string,
    actionLabel?: string,
    actionOnClick?: () => void,
) => void;

export const toast: {
    success: TToastFunc;
    error: TToastFunc;
    warning: TToastFunc;
} = {
    success: (message, description, actionLabel, actionOnClick) => {
        buildToast(t.success, message, description, actionLabel, actionOnClick);
    },
    error: (message, description, actionLabel, actionOnClick) => {
        buildToast(t.error, message, description, actionLabel, actionOnClick);
    },
    warning: (message, description, actionLabel, actionOnClick) => {
        buildToast(t.warning, message, description, actionLabel, actionOnClick);
    },
};

export const ToastModal = () => {
    return <Toaster position="top-right" />;
};
