import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import classNames from "classnames";

const ICON_SIZE = 20;

type StatusType = "success" | "warning" | "danger";

interface CustomToastProps {
  statusType: StatusType;
  toastMessage: { title: string; message: string };
  toastClassName?: string;
}

const toasts = {
  danger: {
    className: "danger",
    icon: <FaTimesCircle size={ICON_SIZE} />,
  },
  success: {
    className: "success",
    icon: <FaCheckCircle size={ICON_SIZE} />,
  },
  warning: {
    className: "warning",
    icon: <FaExclamationCircle size={ICON_SIZE} />,
  },
};

function CustomToast({
  statusType,
  toastMessage,
  toastClassName,
}: CustomToastProps) {
  const toastType = toasts[statusType];

  return (
    <div>
      {toastType && (
        <div
          className={classNames(
            "flex items-center py-4 px-4 text-white rounded-lg shadow-md",
            {
              "bg-red-600": toastType.className === "danger",
              "bg-yellow-600": toastType.className === "warning",
              "bg-green-600": toastType.className === "success",
            },
            toastClassName
          )}
        >
          <div className="self-start">{toastType.icon}</div>
          <div className="ml-4 text-left">
            <span className="font-bold capitalize">{toastMessage.title}</span>
            <p className="mt-1">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface NotifyProps {
  autoClose?: number | false;
  className?: string;
  data: { title: string; message: string };
  draggable?: boolean;
  type: StatusType;
}

export const notify = (props: NotifyProps) => {
  const { autoClose = 2000, data, draggable = false, type } = props;

  toast(<CustomToast statusType={type} toastMessage={data} />, {
    autoClose,
    closeButton: false,
    draggable,
    hideProgressBar: true,
    progressClassName: "bg-white",
  });
};

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="mt-10 text-sm"
      toastClassName={() =>
        classNames(
          "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        )
      }
      bodyClassName={() => "flex items-center"}
      closeButton={false}
    />
  );
}
