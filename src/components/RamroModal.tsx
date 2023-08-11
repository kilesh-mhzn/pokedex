import { FC, ReactNode } from "react";
import { IconClose } from "./icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RamroModal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
      <div className="bg-slate-100 rounded-lg p-6 shadow-xl z-50 relative">
        <div
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IconClose size="1.5em" color="#000" />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default RamroModal;
