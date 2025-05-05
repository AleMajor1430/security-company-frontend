import { useEffect, useState } from "react";
import {
    getAllGuards,
    createGuard,
    updateGuard,
    deleteGuard,
    updateGuardStatus,
} from "../../services/guardsApi";
import GuardForm from "./GuardsForm";
import { DataTable } from "../common/DataTable";
import { StatusIndicator } from "../common/StatusIndicator";
import {
    Modal,
    ModalHeader,
    ConfirmationModal,
    GuardStatusUpdateModal
} from "../common/Modals";
import { AddButton, EditButton, DeleteButton } from "../common/TableActions"; // Added AddButton import

const GuardsTable = () => {
    const [guards, setGuards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentGuard, setCurrentGuard] = useState(null);
    const [guardToDelete, setGuardToDelete] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);    


    useEffect(() => {
        fetchGuards();
    }, []);

    const fetchGuards = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllGuards();
            setGuards(response.data);
        } catch (error) {
            console.error("Failed to fetch guard details", error);
            setError("Failed to load guards. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddGuard = () => {
        setCurrentGuard(null);
        setShowForm(true);
    };

    const handleEditGuard = (guard) => {
        setCurrentGuard(guard);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        try {
            setError(null);
            if (currentGuard) {
                await updateGuard(currentGuard._id, data);
            } else {
                await createGuard(data);
            }
            fetchGuards();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving guard:", error);
            setError("Failed to save guard. Please try again.");
        }
    };

    const confirmDelete = async () => {
        try {
            setError(null);
            await deleteGuard(guardToDelete);
            fetchGuards();
            setGuardToDelete(null);
        } catch (error) {
            console.error("Error deleting guard:", error);
            setError("Failed to delete guard. Please try again.");
        }
    };

    const handleStatusClick = (guard) => {
        setCurrentGuard(guard);
        setNewStatus(guard.status);
        setStatusDialogOpen(true);
    };

    const handleStatusUpdate = async () => {
        if (!currentGuard) return;

        try {
            setError(null);
            await updateGuardStatus(currentGuard._id, { status: newStatus });
            fetchGuards();
            setStatusDialogOpen(false);
        } catch (error) {
            console.log("Error Updating Status:", error);
            setError("Failed to update status. Please try again.");
        }
    };

    const tableColumns = [
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'last_name', label: 'Last Name', sortable: true },
        { key: 'security_company', label: 'Company Name', sortable: true },
        { key: 'location', label: 'Location', sortable: false },
        { key: 'contact', label: 'Contact', sortable: false },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    // Get unique districts from guards
    const getDistrictOptions = () => {
        const districts = new Set();
        guards.forEach(guard => {
            if (guard.district) {
                districts.add(guard.district);
            }
        });
        return Array.from(districts).map(district => ({
            value: district,
            label: district
        }));
    };

    const filters = [
        {
            key: 'search',
            type: 'search',
            placeholder: 'Search by name...'
        },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Filter by Status',
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Suspended', label: 'Suspended' },
                { value: 'Terminated', label: 'Terminated' },
            ]
        },
        {
            key: 'district',
            type: 'select',
            placeholder: 'Filter by District',
            options: getDistrictOptions()
        }
    ];

    const renderGuardRow = (guard) => (
        <tr key={guard._id}>
            <td className="px-6 py-4 font-medium">{guard.first_name}</td>
            <td className="px-6 py-4 font-medium">{guard.last_name}</td>
            <td className="px-6 py-4 font-medium">{guard?.security_company?.name}</td>
            <td className="px-6 py-4">
                {guard.district}, {guard.village}
            </td>
            <td className="px-6 py-4">
                <div>{guard.phone_number}</div>
                <div className="text-xs text-gray-500">{guard.email}</div>
            </td>
            <td className="px-6 py-4">
                <StatusIndicator
                    status={guard.status}
                    onClick={() => handleStatusClick(guard)}
                />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-x-3">
                    <EditButton onClick={() => handleEditGuard(guard)} />
                    <DeleteButton onClick={() => setGuardToDelete(guard._id)} />
                </div>
            </td>
        </tr>
    );

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <>
            <DataTable
                title="Security Guards"
                data={guards}
                columns={tableColumns}
                renderRow={renderGuardRow}
                filters={filters}
                onAdd={handleAddGuard}
            />

            {/* Form Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <ModalHeader onClose={() => setShowForm(false)}>
                    {currentGuard ? "Edit Guard" : "Add Guard"}
                </ModalHeader>
                <GuardForm
                    onSubmit={handleSubmit}
                    initialData={currentGuard}
                    onCancel={() => setShowForm(false)}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!guardToDelete}
                onClose={() => setGuardToDelete(null)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this guard? This action cannot be undone."
                confirmText="Delete"
            />

            {/* Status Update Modal */}
            <GuardStatusUpdateModal
                isOpen={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
                onSave={handleStatusUpdate}
                status={newStatus}
                setStatus={setNewStatus}
            />
        </>
    );
};

export default GuardsTable;
