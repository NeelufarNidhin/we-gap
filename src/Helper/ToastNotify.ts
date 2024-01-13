import { toast , TypeOptions} from "react-toastify";

const ToastNotify = (message: string,type: TypeOptions = "success") => {
    toast.error(message, {
        type:type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

}

export default ToastNotify