import { useForm } from "react-hook-form";
import { useState } from "react";
import { PencilLine, X, Save } from "lucide-react";

const CompanyForm = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: initialData || {
            name: "",
            district: "",
            village: "",
            street: "",
            phone_number: "",
            email: "",
            status: "Pending",
            registration_date: "",
            renewal_date: "",
            termination_date: "",
            restoration_date: "",
            added_by: ""
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            await onSubmit(data);
            setMessage({
                text: initialData ? "Company updated successfully." : "Company created successfully.",
                type: "success"
            });
            if (!initialData) reset();
        } catch (error) {
            console.error("Error saving company:", error);
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
            {/* Scrollable form content */}
            <div className="overflow-y-auto flex-grow max-h-[calc(100vh-180px)] p-4">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    {message.text && (
                        <div className={`p-3 rounded-md ${
                            message.type === "success" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Company Details</h3>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Company Name *</label>
                                <input
                                    type="text"
                                    {...register("name", { 
                                        required: "Company name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email *</label>
                                <input
                                    type="email"
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    {...register("phone_number", { 
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10,15}$/,
                                            message: "Invalid phone number (10-15 digits)"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Status *</label>
                                <select
                                    {...register("status", { required: "Status is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Declined">Declined</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        {/* Location Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Location Details</h3>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">District *</label>
                                <input
                                    type="text"
                                    {...register("district", { 
                                        required: "District is required",
                                        minLength: {
                                            value: 2,
                                            message: "District must be at least 2 characters"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Village *</label>
                                <input
                                    type="text"
                                    {...register("village", { 
                                        required: "Village is required",
                                        minLength: {
                                            value: 2,
                                            message: "Village must be at least 2 characters"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Street *</label>
                                <input
                                    type="text"
                                    {...register("street", { 
                                        required: "Street is required",
                                        minLength: {
                                            value: 2,
                                            message: "Street must be at least 2 characters"
                                        }
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Dates Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Important Dates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Registration Date</label>
                                <input
                                    type="date"
                                    {...register("registration_date")}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Renewal Date</label>
                                <input
                                    type="date"
                                    {...register("renewal_date")}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Termination Date</label>
                                <input
                                    type="date"
                                    {...register("termination_date")}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Restoration Date</label>
                                <input
                                    type="date"
                                    {...register("restoration_date")}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Added By Section (visible when editing) */}
                    {initialData?.added_by && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Admin Information</h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Added By</label>
                                <input
                                    type="text"
                                    value={initialData.added_by.name || "Admin"}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>
                        </div>
                    )}
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
                                        Update Company
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Create Company
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

export default CompanyForm;