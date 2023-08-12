import React, { ReactNode, useEffect } from "react";
import { IconClose } from "./icons";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RamroDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const drawerClassName = `z-[90] md:w-max fixed top-0 right-0 w-[90%] h-full bg-white-100 shadow-xl transform transition-transform ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div className={drawerClassName}>
      <div className="">
        <div
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 cursor-pointer z-50"
        >
          <IconClose size="1.5em" color="#000" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default RamroDrawer;
