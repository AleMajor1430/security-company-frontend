import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const EmployeeForm = ({
    onSubmit,
    initialData,
    onCancel,
    departments = [],
    ministries = [],
    employees = []
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: initialData || {
            employee_id: "",
            employee_number: "",
            date_of_employment: "",
            grade: "",
            position: "",
            has_warning: false,
            warning_count: 0,
            department_id: "",
            ministry_id: ""
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Set initial values when initialData changes
    useEffect(() => {
        if (initialData) {
            Object.entries(initialData).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [initialData, setValue]);

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);
            // Convert data types before submission
            const submissionData = {
                ...data,
                employee_id: data.employee_id || null,
                has_warning: data.has_warning === "true",
                warning_count: Number(data.warning_count),
                department_id: data.department_id || null,
                ministry_id: data.ministry_id || null
            };

            await onSubmit(submissionData);
            setMessage(initialData ? "Employee updated successfully." : "Employee created successfully.");
            if (!initialData) reset();
        } catch (error) {
            console.error("Error saving employee:", error);
            setMessage(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-y-auto flex-grow max-h-[calc(100vh-180px)]">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {message && (
                        <div className={`mb-4 text-sm text-center ${message.includes("success") ? "text-green-600" : "text-red-600"
                            }`}>{message}</div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Employee*</label>
                        <select
                            {...register("employee_id", { required: true })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.first_name} {emp.last_name} ({emp.employee_id})
                                </option>
                            ))}
                        </select>
                        {errors.employee_id && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Employee Number*</label>
                        <input
                            type="text"
                            {...register("employee_number", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.employee_number && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Date of Employment*</label>
                        <input
                            type="date"
                            {...register("date_of_employment", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.date_of_employment && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Grade*</label>
                        <input
                            type="text"
                            {...register("grade", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.grade && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Position*</label>
                        <input
                            type="text"
                            {...register("position", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.position && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Has Warning?*</label>
                        <select
                            {...register("has_warning", { required: true })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        {errors.has_warning && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Warning Count*</label>
                        <input
                            type="number"
                            {...register("warning_count", {
                                required: true,
                                min: 0,
                                valueAsNumber: true
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.warning_count && <p className="text-red-500 text-sm">This field is required</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <select
                            {...register("department_id")}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.department_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ministry</label>
                        <select
                            {...register("ministry_id")}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Ministry</option>
                            {ministries.map(ministry => (
                                <option key={ministry._id} value={ministry._id}>
                                    {ministry.ministry_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            <div className="border-t pt-4 mt-4 sticky bottom-0 bg-white">
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-ghost"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit(handleFormSubmit)}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Employee"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;