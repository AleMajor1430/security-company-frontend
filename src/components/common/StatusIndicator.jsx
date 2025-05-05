export const StatusIndicator = ({ status, onClick, className = "" }) => {
    
    const statusClasses = {
        Approved: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Declined: "bg-red-100 text-red-800",
        Active: "bg-green-100 text-green-800",
        Inactive: "bg-yellow-100 text-yellow-800",
        Suspended: "bg-blue-100 text-blue-800",
        Terminated: "bg-red-100 text-red-800",
        "On Hand": "bg-green-100 text-green-800",
        Lost: "bg-yellow-100 text-yellow-800",
        Stolen: "bg-red-100 text-red-800",

    };

    return (
        <span 
            className={`cursor-pointer px-2 py-1 rounded-full text-xs ${statusClasses[status] || ''} ${className}`} 
            onClick={onClick}
        >
            {status}
        </span>
    );
};