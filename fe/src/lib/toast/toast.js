import { toast } from "react-toastify"

export const showSuccess = (msg) => {
    toast.success(msg)
}

export const showFail = (msg) => {
    toast.error(msg)
}

export const confirmToast = (msg) => {
    toast.warn(msg)
}