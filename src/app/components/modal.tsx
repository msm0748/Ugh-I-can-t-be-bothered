interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  closeButtonText: string;
  confirmButtonText: string;
  title: string;
  message: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  closeButtonText,
  confirmButtonText,
  title,
  message,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-center">{message}</p>
        <div className="flex gap-4">
          <button
            className="
                  flex-1 px-6 py-3
                  rounded-xl
                  bg-gray-200
                  text-gray-800 text-lg font-bold
                  hover:bg-gray-300
                  transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-gray-300
                "
            onClick={onClose}
          >
            {closeButtonText}
          </button>
          <button
            className="
                  flex-1 px-6 py-3
                  rounded-xl
                  bg-red-500
                  text-white text-lg font-bold
                  hover:bg-red-600
                  transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-red-300
                "
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
