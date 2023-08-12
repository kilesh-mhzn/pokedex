import React, { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div
      className={`${visible ? "animate-slideOut" : "animate-slideIn"} 
      fixed top-10 right-1/2 translate-x-1/2 bg-slate-50 text-slate-800 dark:bg-gray-800 dark:text-white-100 
      px-4 py-2 rounded-md shadow-md font-semibold z-[9999]`}
    >
      {message}
    </div>
  );
};

export default Toast;
