import { ChevronDown, ChevronUp } from "lucide-react";

export const Table = ({ children, className = "" }) => {
    return (
        <div className="rounded-2xl border shadow-sm bg-white">
            {children}
        </div>
    );
};

export const TableHeader = ({ children, className = "" }) => {
    return (
        <div className={`border-b px-6 py-4 flex justify-between items-center ${className}`}>
            {children}
        </div>
    );
};

export const TableContainer = ({ children }) => {
    return <div className="overflow-x-auto">{children}</div>;
};

export const TableHead = ({ children }) => {
    return (
        <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
            {children}
        </thead>
    );
};

export const TableBody = ({ children }) => {
    return <tbody className="divide-y">{children}</tbody>;
};

export const TableRow = ({ children, isExpanded = false, onClick }) => {
    return (
        <tr 
            className={`hover:bg-slate-50 ${isExpanded ? 'bg-gray-50' : ''}`} 
            onClick={onClick}
        >
            {children}
        </tr>
    );
};

export const TableCell = ({ children, className = "", colSpan }) => {
    return (
        <td className={`px-6 py-4 ${className}`} colSpan={colSpan}>
            {children}
        </td>
    );
};

export const SortableHeader = ({ children, sortKey, sortConfig, onSort }) => {
    return (
        <th 
            className="px-6 py-3 cursor-pointer" 
            onClick={() => onSort(sortKey)}
        >
            <div className="flex items-center gap-1">
                {children}
                {sortConfig.key === sortKey && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                )}
            </div>
        </th>
    );
};