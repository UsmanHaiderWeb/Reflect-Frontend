import { toast } from 'react-toastify';

export default function ShowToast(message: string, type: "success" | "warn" | "info" | "error") {
    toast[type](message, {
        position: window.innerWidth < 450 ? "bottom-center" : "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            fontSize: '13px',
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
        }
    })
}