import { useEffect, useState } from "react";
import {
    getAllGuardsInformation,
    createGuardInformation,
    updateGuardInformation,
    deleteGuardInformation,
    updateGuardVerificationStatus,
} from "../../services/guardsInformationApi";
import SecurityGuardInformationForm from "./SecurityGuardInformationForm";
import { DataTable } from "../common/DataTable";
import { StatusIndicator } from "../common/StatusIndicator";
import {
    Modal,
    ModalHeader,
    ConfirmationModal,
    VerificationStatusModal
} from "../common/Modals";
import { AddButton, EditButton, DeleteButton } from "../common/TableActions";
import { User, Shield } from "lucide-react";

const SecurityGuardInformationTable = () => {
    const [guardInfos, setGuardInfos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [infoToDelete, setInfoToDelete] = useState(null);
    const [newVerificationStatus, setNewVerificationStatus] = useState(false);
    const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);

    useEffect(() => {
        fetchSecurityGuardInformation();
    }, []);

    const fetchSecurityGuardInformation = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllGuardsInformation();
            setGuardInfos(response.data);
        } catch (error) {
            console.error("Failed to fetch guard information", error);
            setError("Failed to load guard information. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddInfo = () => {
        setCurrentInfo(null);
        setShowForm(true);
    };

    const handleEditInfo = (info) => {
        setCurrentInfo(info);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        try {
            setError(null);
            if (currentInfo) {
                await updateGuardInformation(currentInfo._id, data);
            } else {
                await createGuardInformation(data);
            }
            fetchSecurityGuardInformation();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving guard information:", error);
            setError("Failed to save guard information. Please try again.");
        }
    };

    const confirmDelete = async () => {
        try {
            setError(null);
            await deleteGuardInformation(infoToDelete);
            fetchSecurityGuardInformation();
            setInfoToDelete(null);
        } catch (error) {
            console.error("Error deleting guard information:", error);
            setError("Failed to delete guard information. Please try again.");
        }
    };

    const handleVerificationClick = (info) => {
        setCurrentInfo(info);
        setNewVerificationStatus(info.verified);
        setVerificationDialogOpen(true);
    };

    const handleVerificationUpdate = async () => {
        if (!currentInfo) return;

        try {
            setError(null);
            await updateGuardVerificationStatus(currentInfo._id, { verified: newVerificationStatus });
            fetchSecurityGuardInformation();
            setVerificationDialogOpen(false);
        } catch (error) {
            console.log("Error updating verification status:", error);
            setError("Failed to update verification status. Please try again.");
        }
    };

    const tableColumns = [
        { key: 'guard', label: 'Guard', sortable: true },
        { key: 'documents', label: 'Documents', sortable: false },
        { key: 'verification', label: 'Verification', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const filters = [
        {
            key: 'search',
            type: 'search',
            placeholder: 'Search by guard name...'
        },
        {
            key: 'verified',
            type: 'select',
            placeholder: 'Filter by Verification',
            options: [
                { value: 'true', label: 'Verified' },
                { value: 'false', label: 'Not Verified' }
            ]
        }
    ];

    const renderGuardInfoRow = (info) => (
        <tr key={info._id}>
            <td className="px-6 py-4 font-medium">
                {info.security_guard?.first_name} {info.security_guard?.last_name}
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                    {info.police_clearance && (
                        <a href={info.police_clearance} target="_blank" rel="noopener noreferrer" className="badge badge-primary">
                            Police Clearance
                        </a>
                    )}
                    {info.education_certificate && (
                        <a href={info.education_certificate} target="_blank" rel="noopener noreferrer" className="badge badge-secondary">
                            Education Cert
                        </a>
                    )}
                    {info.national_id && (
                        <a href={info.national_id} target="_blank" rel="noopener noreferrer" className="badge badge-accent">
                            National ID
                        </a>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <StatusIndicator
                    status={info.verified ? "Verified" : "Pending"}
                    onClick={() => handleVerificationClick(info)}
                />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-x-3">
                    <EditButton onClick={() => handleEditInfo(info)} />
                    <DeleteButton onClick={() => setInfoToDelete(info._id)} />
                </div>
            </td>
        </tr>
    );

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <>
            <DataTable
                title="Security Guard Information"
                data={guardInfos}
                columns={tableColumns}
                renderRow={renderGuardInfoRow}
                filters={filters}
                onAdd={handleAddInfo}
                icon={<User size={20} />}
            />

            {/* Form Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <ModalHeader onClose={() => setShowForm(false)}>
                    {currentInfo ? "Edit Guard Information" : "Add Guard Information"}
                </ModalHeader>
                <SecurityGuardInformationForm
                    onSubmit={handleSubmit}
                    initialData={currentInfo}
                    onCancel={() => setShowForm(false)}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!infoToDelete}
                onClose={() => setInfoToDelete(null)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this guard information? This action cannot be undone."
                confirmText="Delete"
            />

            {/* Verification Status Modal */}
            <VerificationStatusModal
                isOpen={verificationDialogOpen}
                onClose={() => setVerificationDialogOpen(false)}
                onSave={handleVerificationUpdate}
                verified={newVerificationStatus}
                setVerified={setNewVerificationStatus}
            />
        </>
    );
};

export default SecurityGuardInformationTable;