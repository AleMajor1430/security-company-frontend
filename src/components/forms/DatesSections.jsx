export const DatesSection = ({ register, errors, watch, setValue, status }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hire Date
                </label>
                <input
                    type="date"
                    {...register("hire_date", { required: "Hire date is required" })}
                    className={`form-input ${errors.hire_date ? "border-red-500" : ""}`}
                />
                {errors.hire_date && (
                    <p className="mt-1 text-sm text-red-600">{errors.hire_date.message}</p>
                )}
            </div>

            {status === "Terminated" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Termination Date
                    </label>
                    <input
                        type="date"
                        {...register("termination_date")}
                        className="form-input"
                    />
                </div>
            )}
        </div>
    );
};