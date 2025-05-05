import { useState, useEffect } from "react";
import { Table, TableHeader, TableContainer, TableHead, TableBody } from "./Table";
import { Pagination } from "./Pagination";
import { FiltersContainer, SearchInput, SelectFilter } from "./Filters";
import { AddButton } from "./TableActions";
import { SortableHeader } from "./Table";

export const DataTable = ({
    title,
    data,
    columns,
    renderRow,
    itemsPerPage = 10,
    filters = [],
    initialSort = { key: null, direction: 'asc' },
    onAdd,
    addButtonLabel = "Add New"
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState(initialSort);
    const [filterValues, setFilterValues] = useState({});
    const [filteredData, setFilteredData] = useState(data);

    // Apply sorting
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Apply pagination
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Handle filtering
    useEffect(() => {
        let result = data;

        Object.entries(filterValues).forEach(([key, value]) => {
            if (value) {
                result = result.filter(item => {
                    if (key === 'search') {
                        return item.name.toLowerCase().includes(value.toLowerCase());
                    }
                    return item[key] === value;
                });
            }
        });

        setFilteredData(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [data, filterValues]);

    const handleFilterChange = (filterKey, value) => {
        setFilterValues(prev => ({
            ...prev,
            [filterKey]: value
        }));
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Table>
            <TableHeader>
                <h2 className="text-lg font-semibold">{title}</h2>

                {filters.length > 0 && (
                    <FiltersContainer>
                        {filters.map(filter => {
                            if (filter.type === 'search') {
                                return (
                                    <SearchInput
                                        key={filter.key}
                                        value={filterValues[filter.key] || ''}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        placeholder={filter.placeholder}
                                    />
                                );
                            }
                            if (filter.type === 'select') {
                                return (
                                    <SelectFilter
                                        key={filter.key}
                                        value={filterValues[filter.key] || ''}
                                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                                        options={filter.options}
                                        placeholder={filter.placeholder}
                                    />
                                );
                            }
                            return null;
                        })}
                    </FiltersContainer>
                )}

                {onAdd && <AddButton onClick={onAdd} label={addButtonLabel} />}
            </TableHeader>

            <TableContainer>
                <table className="min-w-full text-sm text-left">
                    <TableHead>
                        <tr>
                            {columns.map(column => (
                                column.sortable ? (
                                    <SortableHeader
                                        key={column.key}
                                        sortKey={column.key}
                                        sortConfig={sortConfig}
                                        onSort={requestSort}
                                    >
                                        {column.label}
                                    </SortableHeader>
                                ) : (
                                    <th key={column.key} className="px-6 py-3">
                                        {column.label}
                                    </th>
                                )
                            ))}
                        </tr>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map(item => renderRow(item))}
                    </TableBody>
                </table>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </TableContainer>
        </Table>
    );
};