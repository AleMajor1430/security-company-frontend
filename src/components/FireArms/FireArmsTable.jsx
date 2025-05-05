import { useEffect, useState } from "react";
import {
    getAllFireArms,
    createFireArm,
    updateFireArm,
    deleteFireArm,
    updateFireArmStatus,
    getFireArmsByCompanyId,
    getFireArmsByGuardId
} from "../../services/fireArmsApi";
import FireArmForm from "./FireArmsForm";
import { DataTable } from "../common/DataTable";
import { StatusIndicator } from "../common/StatusIndicator";
import {
    Modal,
    ModalHeader,
    ConfirmationModal,
    GunStatusUpdateModal
} from "../common/Modals";
import { AddButton, EditButton, DeleteButton } from "../common/TableActions";

const FireArmsTable = ({ companyId = null, guardId = null }) => {
    const [fireArms, setFireArms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentFireArm, setCurrentFireArm] = useState(null);
    const [fireArmToDelete, setFireArmToDelete] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);

    useEffect(() => {
        fetchFireArms();
    }, [companyId, guardId]);

    const fetchFireArms = async () => {
        try {
            setLoading(true);
            setError(null);
            let response;

            if (guardId) {
                response = await getFireArmsByGuardId(guardId);
            } else if (companyId) {
                response = await getFireArmsByCompanyId(companyId);
            } else {
                response = await getAllFireArms();
            }

            setFireArms(response.data);
        } catch (error) {
            console.error("Failed to fetch firearms:", error);
            setError("Failed to load firearms. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddFireArm = () => {
        setCurrentFireArm(null);
        setShowForm(true);
    };

    const handleEditFireArm = (fireArm) => {
        setCurrentFireArm(fireArm);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        try {
            setError(null);
            if (currentFireArm) {
                await updateFireArm(currentFireArm._id, data);
            } else {
                await createFireArm(data);
            }
            fetchFireArms();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving firearm:", error);
            setError("Failed to save firearm. Please try again.");
        }
    };

    const confirmDelete = async () => {
        try {
            setError(null);
            await deleteFireArm(fireArmToDelete);
            fetchFireArms();
            setFireArmToDelete(null);
        } catch (error) {
            console.error("Error deleting firearm:", error);
            setError("Failed to delete firearm. Please try again.");
        }
    };

    const handleStatusClick = (fireArm) => {
        setCurrentFireArm(fireArm);
        setNewStatus(fireArm.status);
        setStatusDialogOpen(true);
    };

    const handleStatusUpdate = async () => {
        if (!currentFireArm) return;

        try {
            setError(null);
            await updateFireArmStatus(currentFireArm._id, { status: newStatus });
            fetchFireArms();
            setStatusDialogOpen(false);
        } catch (error) {
            console.log("Error Updating Status:", error);
            setError("Failed to update status. Please try again.");
        }
    };

    const tableColumns = [
        { key: 'serial_number', label: 'Serial Number', sortable: true },
        { key: 'firearm_type', label: 'Type', sortable: true },
        { key: 'issue_date', label: 'Issue Date', sortable: true },
        { key: 'guard', label: 'Assigned Guard', sortable: false },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const filters = [
        {
            key: 'search',
            type: 'search',
            placeholder: 'Search by serial number...'
        },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Filter by Status',
            options: [
                { value: 'On Hand', label: 'On Hand' },
                { value: 'Lost', label: 'Lost' },
                { value: 'Stolen', label: 'Stolen' }
            ]
        },
        {
            key: 'firearm_type',
            type: 'select',
            placeholder: 'Filter by Type',
            options: [
                { value: 'Pistol', label: 'Pistol' },
                { value: 'Rifle', label: 'Rifle' },
                { value: 'Shotgun', label: 'Shotgun' }
            ]
        }
    ];

    const renderFireArmRow = (fireArm) => (
        <tr key={fireArm._id}>
            <td className="px-6 py-4 font-medium">{fireArm.serial_number}</td>
            <td className="px-6 py-4">{fireArm.firearm_type}</td>
            <td className="px-6 py-4">
                {new Date(fireArm.issue_date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                {fireArm.security_guard?.first_name} {fireArm.security_guard?.last_name}
            </td>
            <td className="px-6 py-4">
                <StatusIndicator
                    status={fireArm.status}
                    onClick={() => handleStatusClick(fireArm)}
                />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-x-3">
                    <EditButton onClick={() => handleEditFireArm(fireArm)} />
                    <DeleteButton onClick={() => setFireArmToDelete(fireArm._id)} />
                </div>
            </td>
        </tr>
    );

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <>
            <DataTable
                title={guardId ? "Guard's Firearms" : companyId ? "Company Firearms" : "All Firearms"}
                data={fireArms}
                columns={tableColumns}
                renderRow={renderFireArmRow}
                filters={filters}
                onAdd={handleAddFireArm}
            />

            {/* Form Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <ModalHeader onClose={() => setShowForm(false)}>
                    {currentFireArm ? "Edit Firearm" : "Add Firearm"}
                </ModalHeader>
                <FireArmForm
                    onSubmit={handleSubmit}
                    initialData={currentFireArm}
                    onCancel={() => setShowForm(false)}
                    companyId={companyId}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!fireArmToDelete}
                onClose={() => setFireArmToDelete(null)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this firearm record? This action cannot be undone."
                confirmText="Delete"
            />

            {/* Status Update Modal */}
            <GunStatusUpdateModal
                isOpen={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
                onSave={handleStatusUpdate}
                status={newStatus}
                setStatus={setNewStatus}
                options={[
                    { value: 'On Hand', label: 'On Hand' },
                    { value: 'Lost', label: 'Lost' },
                    { value: 'Stolen', label: 'Stolen' }
                ]}
            />
        </>
    );
};

export default FireArmsTable;