import { toast } from "react-toastify";

const toastAlert = (type, message) => {
  const position = "top-center"; 
  switch (type) {
    case "success":
      toast.success(message, { position });
      break;
    case "error":
      toast.error(message, { position });
      break;
    case "info":
      toast.info(message, { position });
      break;
    case "warning":
      toast.warning(message, { position });
      break;
    case "pending":
      toast.warning(message, { position });
      break;
    case "Declined":
      toast.warning(message, { position });
      break;
    case "Applied":
      toast.warning(message, { position });
      break;
    default:
      toast.success(message, { position });
      break;
  }
};

export default toastAlert;
