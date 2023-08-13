import React, { ReactNode, useEffect } from "react";
import { IconClose } from "./icons";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RamroDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const drawerClassName = `z-[90] md:w-max fixed top-0 right-0 w-[90%]
   h-full bg-slate-50 dark:bg-slate-800 shadow-xl transform transition-transform 
   ${isOpen ? "translate-x-0" : "translate-x-full"}`;

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
        {isOpen && (
          <div
            onClick={onClose}
            className={`absolute  left-[-30px] hover:text-white-100 cursor-pointer z-50
          bg-slate-50 dark:bg-slate-800 p-3 rounded-full shadow-xl`}
          >
            <IconClose
              size="1.5em"
              className="text-slate-800 dark:text-slate-50"
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default RamroDrawer;
