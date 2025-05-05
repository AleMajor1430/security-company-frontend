export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
                {children}
            </div>
        </div>
    );
};

export const ModalHeader = ({ children, onClose }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{children}</h3>
            <button
                onClick={onClose}
                className="btn btn-ghost btn-sm"
            >
                ✕
            </button>
        </div>
    );
};

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="btn btn-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn btn-danger btn-sm"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const StatusUpdateModal = ({
    isOpen,
    onClose,
    onSave,
    status,
    setStatus,
    options = [
        { value: "Approved", label: "Approved" },
        { value: "Pending", label: "Pending" },
        { value: "Declined", label: "Declined" }
    ]
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">Update Status</h2>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export const GuardStatusUpdateModal = ({
    isOpen,
    onClose,
    onSave,
    status,
    setStatus,
    options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Suspended', label: 'Suspended' },
        { value: 'Terminated', label: 'Terminated' },
    ]
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">Update Status</h2>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


export const GunStatusUpdateModal = ({
    isOpen,
    onClose,
    onSave,
    status,
    setStatus,
    options = [
        { value: 'On Hand', label: 'On Hand' },
        { value: 'Lost', label: 'Lost' },
        { value: 'Stolen', label: 'Stolen' },
    ]
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">Update Status</h2>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export const VerificationStatusModal = ({
    isOpen,
    onClose,
    onSave,
    status,
    setStatus,
    options = [
        { value: "Approved", label: "Approved" },
        { value: "Pending", label: "Pending" },
        { value: "Declined", label: "Declined" }
    ]
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">Update Status</h2>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
