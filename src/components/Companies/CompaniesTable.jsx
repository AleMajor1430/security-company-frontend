import { useEffect, useState } from "react";
import {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    updateCompanyStatus,
} from "../../services/companiesApi";
import CompanyForm from "./CompaniesForm";
import { DataTable } from "../common/DataTable";
import { StatusIndicator } from "../common/StatusIndicator";
import {
    Modal,
    ModalHeader,
    ConfirmationModal,
    StatusUpdateModal
} from "../common/Modals";
import { AddButton, EditButton, DeleteButton } from "../common/TableActions"; // Added AddButton import

const CompanyTable = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [companyToDelete, setCompanyToDelete] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllCompanies();
            setCompanies(response.data);
        } catch (error) {
            console.error("Failed to fetch company details", error);
            setError("Failed to load companies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCompany = () => {
        setCurrentCompany(null);
        setShowForm(true);
    };

    const handleEditCompany = (company) => {
        setCurrentCompany(company);
        setShowForm(true);
    };

    const handleSubmit = async (data) => {
        try {
            setError(null);
            if (currentCompany) {
                await updateCompany(currentCompany._id, data);
            } else {
                await createCompany(data);
            }
            fetchCompanies();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving company:", error);
            setError("Failed to save company. Please try again.");
        }
    };

    const confirmDelete = async () => {
        try {
            setError(null);
            await deleteCompany(companyToDelete);
            fetchCompanies();
            setCompanyToDelete(null);
        } catch (error) {
            console.error("Error deleting company:", error);
            setError("Failed to delete company. Please try again.");
        }
    };

    const handleStatusClick = (company) => {
        setCurrentCompany(company);
        setNewStatus(company.status);
        setStatusDialogOpen(true);
    };

    const handleStatusUpdate = async () => {
        if (!currentCompany) return;

        try {
            setError(null);
            await updateCompanyStatus(currentCompany._id, { status: newStatus });
            fetchCompanies();
            setStatusDialogOpen(false);
        } catch (error) {
            console.log("Error Updating Status:", error);
            setError("Failed to update status. Please try again.");
        }
    };

    const tableColumns = [
        { key: 'name', label: 'Company Name', sortable: true },
        { key: 'location', label: 'Location', sortable: false },
        { key: 'contact', label: 'Contact', sortable: false },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions', sortable: false }
    ];

    // Get unique districts from companies
    const getDistrictOptions = () => {
        const districts = new Set();
        companies.forEach(company => {
            if (company.district) {
                districts.add(company.district);
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
                { value: 'Approved', label: 'Approved' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Declined', label: 'Declined' }
            ]
        },
        {
            key: 'district',
            type: 'select',
            placeholder: 'Filter by District',
            options: getDistrictOptions()
        }
    ];

    const renderCompanyRow = (company) => (
        <tr key={company._id}>
            <td className="px-6 py-4 font-medium">{company.name}</td>
            <td className="px-6 py-4">
                {company.district}, {company.village}
            </td>
            <td className="px-6 py-4">
                <div>{company.phone_number}</div>
                <div className="text-xs text-gray-500">{company.email}</div>
            </td>
            <td className="px-6 py-4">
                <StatusIndicator
                    status={company.status}
                    onClick={() => handleStatusClick(company)}
                />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-x-3">
                    <EditButton onClick={() => handleEditCompany(company)} />
                    <DeleteButton onClick={() => setCompanyToDelete(company._id)} />
                </div>
            </td>
        </tr>
    );

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <>
            <DataTable
                title="Security Companies"
                data={companies}
                columns={tableColumns}
                renderRow={renderCompanyRow}
                filters={filters}
                onAdd={handleAddCompany}
            />

            {/* Form Modal */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <ModalHeader onClose={() => setShowForm(false)}>
                    {currentCompany ? "Edit Company" : "Add Company"}
                </ModalHeader>
                <CompanyForm
                    onSubmit={handleSubmit}
                    initialData={currentCompany}
                    onCancel={() => setShowForm(false)}
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!companyToDelete}
                onClose={() => setCompanyToDelete(null)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this company? This action cannot be undone."
                confirmText="Delete"
            />

            {/* Status Update Modal */}
            <StatusUpdateModal
                isOpen={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
                onSave={handleStatusUpdate}
                status={newStatus}
                setStatus={setNewStatus}
            />
        </>
    );
};

export default CompanyTable;