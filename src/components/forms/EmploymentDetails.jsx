import { Shield } from "lucide-react";

export const EmploymentDetails = ({ register, errors, companies }) => {
    return (
        <>
            <div>
                <label className="block text-sm font-medium mb-1">Security Company *</label>
                <select
                    {...register("security_company", { required: "Company is required" })}
                    className="select select-bordered w-full py-3 px-2"
                >
                    <option value="">Select Company</option>
                    {companies.map(company => (
                        <option key={company._id} value={company._id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                {errors.security_company && <p className="text-red-500 text-sm mt-1">{errors.security_company.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Status *</label>
                <select
                    {...register("status", { required: "Status is required" })}
                    className="select select-bordered w-full py-3 px-2"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Terminated">Terminated</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>
        </>
    );
}; 