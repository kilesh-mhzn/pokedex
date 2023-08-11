import { FC, ReactNode, useEffect } from "react";
import { IconClose } from "./icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RamroModal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-slate-800 opacity-25"
      ></div>
      <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-xl z-50 relative min-h-max w-[90%] md:w-1/2 xl:w-1/3">
        <div
          onClick={closeModal}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IconClose size="1.5em" color="#eceff5" />
        </div>
        <div className="modal-content h-full">{children}</div>
      </div>
    </div>
  );
};

export default RamroModal;
