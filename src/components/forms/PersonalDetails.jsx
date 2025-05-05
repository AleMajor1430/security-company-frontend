import { User } from "lucide-react";

export const PersonalDetails = ({ register, errors }) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <input
                        type="text"
                        {...register("first_name", {
                            required: "First name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters"
                            }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <input
                        type="text"
                        {...register("last_name", {
                            required: "Last name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters"
                            }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Gender *</label>
                <select
                    {...register("gender", { required: "Gender is required" })}
                    className="select select-bordered w-full py-3 px-2"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
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
        </>
    );
};