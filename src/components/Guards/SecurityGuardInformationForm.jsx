import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PencilLine, X, Save, User, Shield } from "lucide-react";
import { getAllGuards } from "../../services/guardsApi";
import { FormSection } from "../forms/FormSection";
import { FormMessage } from "../forms/FormMessage";
import { FormFooter } from "../forms/FormFooter";
import { FileUpload } from "../forms/FileUpload";

const SecurityGuardInformationForm = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: initialData || {
            security_guard: "",
            police_clearance: "",
            education_certificate: "",
            national_id: "",
            verified: false
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [guards, setGuards] = useState([]);

    useEffect(() => {
        const fetchGuards = async () => {
            try {
                const response = await getAllGuards();
                setGuards(response.data);
            } catch (error) {
                console.error("Failed to fetch guards", error);
                setMessage({
                    text: "Failed to load guards",
                    type: "error"
                });
            }
        };
        fetchGuards();
    }, []);

    useEffect(() => {
        if (initialData && guards.length > 0) {
            const formattedData = {
                ...initialData,
                security_guard: initialData.security_guard?._id || initialData.security_guard
            };
            reset(formattedData);
        }
    }, [initialData, guards, reset]);

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            setMessage({ text: "", type: "" });
            
            await onSubmit(data);
            setMessage({
                text: initialData ? "Guard information updated successfully." : "Guard information created successfully.",
                type: "success"
            });
            
            if (!initialData) {
                reset({
                    security_guard: "",
                    police_clearance: "",
                    education_certificate: "",
                    national_id: "",
                    verified: false
                });
            }
        } catch (error) {
            console.error("Error saving guard information:", error);
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
                        <FormSection title="Guard Details" icon={User}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Security Guard *</label>
                                    <select
                                        {...register("security_guard", { required: "Guard is required" })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select guard</option>
                                        {guards.map(guard => (
                                            <option key={guard._id} value={guard._id}>
                                                {guard.first_name} {guard.last_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.security_guard && (
                                        <p className="text-red-500 text-sm mt-1">{errors.security_guard.message}</p>
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

                        <FormSection title="Documents" icon={Shield}>
                            <div className="space-y-4">
                                <FileUpload
                                    label="Police Clearance *"
                                    name="police_clearance"
                                    register={register}
                                    errors={errors}
                                    required
                                    onUpload={(url) => handleFileUpload("police_clearance", url)}
                                    currentFile={watch("police_clearance")}
                                />

                                <FileUpload
                                    label="Education Certificate *"
                                    name="education_certificate"
                                    register={register}
                                    errors={errors}
                                    required
                                    onUpload={(url) => handleFileUpload("education_certificate", url)}
                                    currentFile={watch("education_certificate")}
                                />
                            </div>
                        </FormSection>
                    </div>

                    <FormSection title="Identification">
                        <FileUpload
                            label="National ID *"
                            name="national_id"
                            register={register}
                            errors={errors}
                            required
                            onUpload={(url) => handleFileUpload("national_id", url)}
                            currentFile={watch("national_id")}
                        />
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

export default SecurityGuardInformationForm;