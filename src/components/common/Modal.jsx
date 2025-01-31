import PropTypes from "prop-types";
import closeImage from "../../assets/icons/close.png";

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-11/12 max-w-md p-5">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <img
                        className="w-5 cursor-pointer"
                        src={closeImage}
                        alt="close-image"
                        loading="lazy"
                        onClick={onCancel}
                    />
                </div>
                <p className="text-gray-600 mb-5">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md font-semibold hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div >
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default Modal;
