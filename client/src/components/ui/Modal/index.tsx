import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onRequestClose: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  style,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="z-1000 fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onRequestClose}
    >
      <div
        className="max-sm:min-h-full max-sm:bottom-0 max-h-150 overflow-y-auto bottom-30 bg-stone-900 rounded-2xl shadow-xl py-7 px-5 max-w-xl w-full relative"
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${
            title && "border-b border-stone-800"
          } pb-2 flex items-center absolute top-2 left-2 right-2`}
        >
          <button
            onClick={onRequestClose}
            className="text-stone-500 hover:text-gray-300 hover:bg-stone-950 rounded-full p-2 transition-colors"
          >
            <X />
          </button>

          {title && (
            <div className="ml-3 text-[18px] font-semibold">{title}</div>
          )}
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
