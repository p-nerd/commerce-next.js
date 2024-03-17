import { DeleteModal } from "@/components/modals/delete-modal";
import { SpinnerModal } from "@/components/modals/spinner-modal";
import { ToastModal } from "@/components/modals/toast-modal";

const Providers = () => {
    return (
        <>
            <DeleteModal />
            <SpinnerModal />
            <ToastModal />
        </>
    );
};

export default Providers;
