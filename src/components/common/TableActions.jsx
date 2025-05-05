import { PencilLine, Trash, Plus } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const AddButton = ({ onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className="btn bg-blue-500 text-white btn-sm rounded-md px-4 py-2 flex items-center gap-1"
        >
            <Plus size={16} />
            {label}
        </button>
    );
};


export const EditButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
            title="Edit"
        >
            <PencilLine size={18} />
        </button>
    );
};

export const DeleteButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
            title="Delete"
        >
            <Trash size={18} />
        </button>
    );
};

export const ExpandButton = ({ isExpanded, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-gray-500 hover:text-gray-700"
        >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
    );
};