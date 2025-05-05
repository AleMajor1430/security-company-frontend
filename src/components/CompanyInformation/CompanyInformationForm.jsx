import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PencilLine, X, Save, Building, ShieldCheck } from "lucide-react";
import { getAllCompanies } from "../../services/companiesApi";
import { FormSection } from "../forms/FormSection";
import { FormMessage } from "../forms/FormMessage";
import { FormFooter } from "../forms/FormFooter";
import { FileUpload } from "../forms/FileUpload";

const CompanyInformationForm = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: initialData || {
            security_company: "",
            traders_license: "",
            insurance: "",
            company_profile: "",
            tax_clearance: "",
            verified: false
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getAllCompanies();
                setCompanies(response.data);
            } catch (error) {
                console.error("Failed to fetch companies", error);
                setMessage({
                    text: "Failed to load companies",
                    type: "error"
                });
            }
        };
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (initialData && companies.length > 0) {
            const formattedData = {
                ...initialData,
                security_company: initialData.security_company?._id || initialData.security_company
            };
            reset(formattedData);
        }
    }, [initialData, companies, reset]);

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            setMessage({ text: "", type: "" });
            
            await onSubmit(data);
            setMessage({
                text: initialData ? "Company information updated successfully." : "Company information created successfully.",
                type: "success"
            });
            
            if (!initialData) {
                reset({
                    security_company: "",
                    traders_license: "",
                    insurance: "",
                    company_profile: "",
                    tax_clearance: "",
                    verified: false
                });
            }
        } catch (error) {
            console.error("Error saving company information:", error);
            setMessage({
                text: error.response?.data?.message || "Something went wrong!",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (fieldName, fileUrl) => {
        setValue(fieldName, fileUrl);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-y-auto flex-grow max-h-[calc(100vh-180px)] p-4">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <FormMessage message={message} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormSection title="Company Details" icon={Building}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Security Company *</label>
                                    <select
                                        {...register("security_company", { required: "Company is required" })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select company</option>
                                        {companies.map(company => (
                                            <option key={company._id} value={company._id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.security_company && (
                                        <p className="text-red-500 text-sm mt-1">{errors.security_company.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Verified</label>
                                    <input
                                        type="checkbox"
                                        {...register("verified")}
                                        className="toggle toggle-primary"
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Documents" icon={ShieldCheck}>
                            <div className="space-y-4">
                                <FileUpload
                                    label="Traders License *"
                                    name="traders_license"
                                    register={register}
                                    errors={errors}
                                    required
                                    onUpload={(url) => handleFileUpload("traders_license", url)}
                                    currentFile={watch("traders_license")}
                                />

                                <FileUpload
                                    label="Insurance Certificate *"
                                    name="insurance"
                                    register={register}
                                    errors={errors}
                                    required
                                    onUpload={(url) => handleFileUpload("insurance", url)}
                                    currentFile={watch("insurance")}
                                />
                            </div>
                        </FormSection>
                    </div>

                    <FormSection title="Additional Documents">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileUpload
                                label="Company Profile *"
                                name="company_profile"
                                register={register}
                                errors={errors}
                                required
                                onUpload={(url) => handleFileUpload("company_profile", url)}
                                currentFile={watch("company_profile")}
                            />

                            <FileUpload
                                label="Tax Clearance *"
                                name="tax_clearance"
                                register={register}
                                errors={errors}
                                required
                                onUpload={(url) => handleFileUpload("tax_clearance", url)}
                                currentFile={watch("tax_clearance")}
                            />
                        </div>
                    </FormSection>
                </form>
            </div>

            <FormFooter
                loading={loading}
                initialData={initialData}
                onCancel={onCancel}
                onSubmit={handleSubmit(handleFormSubmit)}
            />
        </div>
    );
};

export default CompanyInformationForm;