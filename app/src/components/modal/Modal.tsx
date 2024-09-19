// Modal.tsx
import React from "react";
import ReactModal from "react-modal";

// Define the props for the Modal component
interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string; // Optional className for additional styling
}

// Ensure the app element is set for accessibility
ReactModal.setAppElement("#root");

const Modal = ({
  isOpen,
  onRequestClose,
  title,
  children,
  className = "",
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`relative w-full max-w-lg mx-4 sm:mx-8 lg:mx-auto my-6 bg-white rounded-lg shadow-lg outline-none ${className}`}
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      closeTimeoutMS={300} // Optional: duration for closing animation
      style={{ overlay: { zIndex: 9999 } }}
    >
      <div className="flex flex-col h-full">
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onRequestClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
        )}
        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
