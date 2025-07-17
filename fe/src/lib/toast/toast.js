import { toast } from "react-toastify"

export const showSuccess = (msg) => {
    toast(msg, {
        style: {
            color: "#4caf50"
        }
    })
}

export const showFail = (msg) => {
    toast(msg, {
        style: {
            color: "#d6004c"
        }
    })
}

export const confirmToast = (msg) => {
    toast(msg, {
        style: {
            color: "#ff9800"
        }
    })
}