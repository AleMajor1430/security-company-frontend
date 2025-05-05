import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PencilLine, X, Save } from "lucide-react";
import { getGuardsByCompanyId } from "../../services/guardsApi";
import { getAllCompanies } from "../../services/companiesApi";

const FireArmForm = ({ onSubmit, initialData, onCancel, companyId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: initialData || {
            serial_number: "",
            firearm_type: "",
            issue_date: new Date().toISOString().split('T')[0],
            security_guard: "",
            security_company: companyId || "",
            status: "On Hand"
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [guards, setGuards] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loadingGuards, setLoadingGuards] = useState(false);

    // Watch the company selection
    const selectedCompanyId = watch("security_company");

    useEffect(() => {
        // Initial load of companies and guards
        const fetchInitialData = async () => {
            try {
                setLoadingGuards(true);

                // Only fetch companies if no companyId is provided
                if (!companyId) {
                    const companiesResponse = await getAllCompanies();
                    setCompanies(companiesResponse.data);
                }

                // Load guards based on initial company (either from props or form default)
                const initialCompany = companyId || selectedCompanyId;
                if (initialCompany) {
                    const guardsResponse = await getGuardsByCompanyId(initialCompany);
                    setGuards(guardsResponse.data);
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoadingGuards(false);
            }
        };

        fetchInitialData();
    }, [companyId]);

    // Effect to update guards when company selection changes
    useEffect(() => {
        if (!companyId && selectedCompanyId) {
            const fetchGuardsForCompany = async () => {
                try {
                    setLoadingGuards(true);
                    const guards = await getGuardsByCompanyId(selectedCompanyId);
                    setGuards(guards);
                    console.log(guards)
                    setValue("security_guard", "");
                } catch (error) {
                    console.error("Error fetching guards:", error);
                } finally {
                    setLoadingGuards(false);
                }
            };

            fetchGuardsForCompany();
        }
    }, [selectedCompanyId, companyId, setValue]);

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            await onSubmit(data);
            setMessage({
                text: initialData ? "Firearm updated successfully." : "Firearm created successfully.",
                type: "success"
            });
            if (!initialData) reset();
        } catch (error) {
            console.error("Error saving firearm:", error);
            setMessage({
                text: error.response?.data?.message || "Something went wrong!",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-y-auto flex-grow max-h-[calc(100vh-180px)] p-4">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    {message.text && (
                        <div className={`p-3 rounded-md ${message.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Firearm Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Firearm Details</h3>

                            <div>
                                <label className="block text-sm font-medium mb-1">Serial Number *</label>
                                <input
                                    type="text"
                                    {...register("serial_number", {
                                        required: "Serial number is required",
                                        minLength: {
                                            value: 2,
                                            message: "Serial number must be at least 2 characters"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.serial_number && <p className="text-red-500 text-sm mt-1">{errors.serial_number.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Firearm Type *</label>
                                <select
                                    {...register("firearm_type", { required: "Type is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select type</option>
                                    <option value="Pistol">Pistol</option>
                                    <option value="Rifle">Rifle</option>
                                    <option value="Shotgun">Shotgun</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.firearm_type && <p className="text-red-500 text-sm mt-1">{errors.firearm_type.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Issue Date *</label>
                                <input
                                    type="date"
                                    {...register("issue_date", {
                                        required: "Issue date is required"
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.issue_date && <p className="text-red-500 text-sm mt-1">{errors.issue_date.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Status *</label>
                                <select
                                    {...register("status", { required: "Status is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="On Hand">On Hand</option>
                                    <option value="Lost">Lost</option>
                                    <option value="Stolen">Stolen</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        {/* Assignment Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Assignment Details</h3>

                            {!companyId && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Security Company *</label>
                                    <select
                                        {...register("security_company", { required: "Company is required" })}
                                        className="select select-bordered w-full"
                                        disabled={loadingGuards}
                                    >
                                        <option value="">Select company</option>
                                        {companies.map(company => (
                                            <option key={company._id} value={company._id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.security_company && <p className="text-red-500 text-sm mt-1">{errors.security_company.message}</p>}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-1">Assigned Guard</label>
                                <select
                                    {...register("security_guard")}
                                    className="select select-bordered w-full"
                                    disabled={loadingGuards}
                                >
                                    <option value=""></option>
                                    {guards.map(guard => (
                                        <option key={guard._id} value={guard._id}>
                                            {guard.first_name} {guard.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Fixed footer with buttons */}
            <div className="border-t pt-4 px-4 sticky bottom-0 bg-white">
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-ghost flex items-center gap-2"
                        disabled={loading}
                    >
                        <X size={18} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit(handleFormSubmit)}
                        className="btn btn-primary flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                {initialData ? (
                                    <>
                                        <PencilLine size={18} />
                                        Update Firearm
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Create Firearm
                                    </>
                                )}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FireArmForm;