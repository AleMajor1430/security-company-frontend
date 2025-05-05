import { useEffect, useState } from "react";
import {
    getAllCompanyInformation,
    createCompanyInformation,
    updateCompanyInformation,
    deleteCompanyInformation,
    updateCompanyVerificationStatus,
} from "../../services/companyInformationApi";
import CompanyInformationForm from "./CompanyInformationForm";
import { DataTable } from "../common/DataTable";
import { StatusIndicator } from "../common/StatusIndicator";
import {
    Modal,
    ModalHeader,
    ConfirmationModal,
    VerificationStatusModal
} from "../common/Modals";
import { AddButton, EditButton, DeleteButton } from "../common/TableActions";
import { Building, ShieldCheck } from "lucide-react";

const CompanyInformationTable = () => {
    const [companyInfos, setCompanyInfos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [infoToDelete, setInfoToDelete] = useState(null);
    const [newVerificationStatus, setNewVerificationStatus] = useState(false);
    const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);

    useEffect(() => {
        fetchCompanyInformation();
    }, []);

    const fetchCompanyInformation = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllCompanyInformation();
            setCompanyInfos(response.data);
        } catch (error) {
            console.error("Failed to fetch company information", error);
            setError("Failed to load company information. Please try again later.");
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
                await updateCompanyInformation(currentInfo._id, data);
            } else {
                await createCompanyInformation(data);
            }
            fetchCompanyInformation();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving company information:", error);
            setError("Failed to save company information. Please try again.");
        }
    };

    const confirmDelete = async () => {
        try {
            setError(null);
            await deleteCompanyInformation(infoToDelete);
            fetchCompanyInformation();
            setInfoToDelete(null);
        } catch (error) {
            console.error("Error deleting company information:", error);
            setError("Failed to delete company information. Please try again.");
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
            await updateCompanyVerificationStatus(currentInfo._id, { verified: newVerificationStatus });
            fetchCompanyInformation();
            setVerificationDialogOpen(false);
        } catch (error) {
            console.log("Error updating verification status:", error);
            setError("Failed to update verification status. Please try again.");
        }
    };

    const tableColumns = [
        { key: 'company', label: 'Company', sortable: true },
        { key: 'documents', label: 'Documents', sortable: false },
        { key: 'verification', label: 'Verification', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    const filters = [
        {
            key: 'search',
            type: 'search',
            placeholder: 'Search by company name...'
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

    const renderCompanyInfoRow = (info) => (
        <tr key={info._id}>
            <td className="px-6 py-4 font-medium">
                {info.security_company?.name || 'Unknown Company'}
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                    {info.traders_license && (
                        <a href={info.traders_license} target="_blank" rel="noopener noreferrer" className="badge badge-primary">
                            Traders License
                        </a>
                    )}
                    {info.insurance && (
                        <a href={info.insurance} target="_blank" rel="noopener noreferrer" className="badge badge-secondary">
                            Insurance
                        </a>
                    )}
                    {info.tax_clearance && (
                        <a href={info.tax_clearance} target="_blank" rel="noopener noreferrer" className="badge badge-accent">
                            Tax Clearance
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
                title="Company Information"
                data={companyInfos}
                columns={tableColumns}
                renderRow={renderCompanyInfoRow}
                filters={filters}
                onAdd={handleAddInfo}
                icon={<Building size={20} />}
            />

            {/* Form Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <ModalHeader onClose={() => setShowForm(false)}>
                    {currentInfo ? "Edit Company Information" : "Add Company Information"}
                </ModalHeader>
                <CompanyInformationForm
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
                message="Are you sure you want to delete this company information? This action cannot be undone."
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

export default CompanyInformationTable;