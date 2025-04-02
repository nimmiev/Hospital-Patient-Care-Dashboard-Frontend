import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to display success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // Close after 3 sec
  });
};

// display error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000, // Close after 3 sec
  });
};

// Main ToastNotification
const ToastNotification = () => {
  return <ToastContainer />;
};

export default ToastNotification;
