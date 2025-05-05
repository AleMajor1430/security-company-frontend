export const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="border px-4 py-2 rounded w-full sm:w-64"
            value={value}
            onChange={onChange}
        />
    );
};

export const SelectFilter = ({ value, onChange, options, placeholder = "Filter..." }) => {
    return (
        <select
            className="border px-4 py-2 rounded"
            value={value}
            onChange={onChange}
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export const FiltersContainer = ({ children }) => {
    return <div className="mb-4 flex flex-wrap gap-4">{children}</div>;
};