import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PencilLine, X, Save, User, Shield } from "lucide-react";
import { getAllCompanies } from "../../services/companiesApi";
import { FormSection } from "../forms/FormSection";
import { FormMessage } from "../forms/FormMessage";
import { FormFooter } from "../forms/FormFooter";
import { PersonalDetails } from "../forms/PersonalDetails";
import { EmploymentDetails }  from "../forms/EmploymentDetails";
import { LocationDetails } from "../forms/LocationDetails";
import { DatesSection } from "../forms/DatesSections";

const GuardForm = ({ onSubmit, initialData, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue,
        control
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            gender: "Male",
            security_company: "",
            phone_number: "",
            email: "",
            district: "",
            village: "",
            street: "",
            chief_name: "",
            next_of_kin: "",
            status: "Active",
            hire_date: new Date().toISOString().split('T')[0],
            training_completed: false,
            termination_date: ""
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [companies, setCompanies] = useState([]);
    const status = watch("status");

    console.log(companies)

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
                security_company: initialData.security_company?._id || initialData.security_company,
                hire_date: initialData.hire_date ? 
                    new Date(initialData.hire_date).toISOString().split('T')[0] : 
                    new Date().toISOString().split('T')[0],
                termination_date: initialData.termination_date ? 
                    new Date(initialData.termination_date).toISOString().split('T')[0] : ""
            };
            reset(formattedData);
        }
    }, [initialData, companies, reset]);

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            setMessage({ text: "", type: "" });
            
            // Convert dates to proper format before submission
            const submissionData = {
                ...data,
                hire_date: new Date(data.hire_date),
                termination_date: data.termination_date ? new Date(data.termination_date) : undefined
            };

            await onSubmit(submissionData);
            setMessage({
                text: initialData ? "Guard updated successfully." : "Guard created successfully.",
                type: "success"
            });
            
            if (!initialData) {
                reset({
                    first_name: "",
                    last_name: "",
                    gender: "Male",
                    security_company: "",
                    phone_number: "",
                    email: "",
                    district: "",
                    village: "",
                    street: "",
                    chief_name: "",
                    next_of_kin: "",
                    status: "Active",
                    hire_date: new Date().toISOString().split('T')[0],
                    training_completed: false,
                    termination_date: ""
                });
            }
        } catch (error) {
            console.error("Error saving guard:", error);
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
                    <FormMessage message={message} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormSection title="Personal Details" icon={User}>
                            <PersonalDetails register={register} errors={errors} />
                        </FormSection>

                        <FormSection title="Employment Details" icon={Shield}>
                            <EmploymentDetails
                                register={register}
                                errors={errors}
                                companies={companies}
                                control={control}
                            />
                        </FormSection>
                    </div>

                    <FormSection title="Location Details">
                        <LocationDetails register={register} errors={errors} />
                    </FormSection>

                    <FormSection title="Dates">
                        <DatesSection 
                            register={register} 
                            errors={errors} 
                            watch={watch}
                            setValue={setValue}
                            status={status}
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

export default GuardForm;