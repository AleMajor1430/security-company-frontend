import { useEffect, useState } from "react";
import { getAllCompanies } from "../services/companiesApi";
import { PencilLine, Trash } from "lucide-react";

const CompaniesTable = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getAllCompanies();
                setCompanies(response.data);
            } catch (error) {
                console.error("Failed to fetch Companies", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="rounded-2xl border shadow-sm bg-white">
            <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Security Companies</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Company Name</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Registration Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {companies.map((company, index) => (
                            <tr key={company._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium">{company.name}</td>
                                <td className="px-6 py-4">
                                    {company.district}, {company.village}, {company.street}
                                </td>
                                <td className="px-6 py-4">
                                    <div>{company.phone_number}</div>
                                    <div className="text-slate-500">{company.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${company.status === "Approved"
                                            ? "bg-green-100 text-green-800"
                                            : company.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }`}>
                                        {company.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {company.registration_date
                                        ? new Date(company.registration_date).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-x-3">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <PencilLine size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompaniesTable;