export const DatesSection = ({ register, errors, watch }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Hire Date *</label>
                    <input
                        type="date"
                        {...register("hire_date", { required: "Hire date is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.hire_date && <p className="text-red-500 text-sm mt-1">{errors.hire_date.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Termination Date</label>
                    <input
                        type="date"
                        {...register("termination_date")}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Training Completed</label>
                    <label className="label cursor-pointer justify-start gap-2">
                        <input
                            type="checkbox"
                            {...register("training_completed")}
                            className="checkbox checkbox-sm"
                        />
                        <span className="label-text">Completed training</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Training Date</label>
                    <input
                        type="date"
                        {...register("last_training_date")}
                        className="input input-bordered w-full"
                        disabled={!watch("training_completed")}
                    />
                </div>
            </div>
            {watch("status") === "Terminated" && (
                <div>
                    <label className="block text-sm font-medium mb-1">Termination Reason</label>
                    <textarea
                        {...register("termination_reason")}
                        className="textarea textarea-bordered w-full"
                        rows={2}
                        placeholder="Reason for termination"
                    />
                </div>
            )}
        </>
    );
};

