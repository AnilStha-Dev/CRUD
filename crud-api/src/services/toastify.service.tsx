import {  toast } from 'react-toastify';

const toaster:any={
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }

    export const successToast=(message:string)=>{
        toast.success(message,toaster);
    }
    export const errorToast=(message:string)=>{
        toast.error(message,toaster);
    }
    export const warningToast=(message:string)=>{
        toast.warning(message, toaster)
    }