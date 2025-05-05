export const LocationDetails = ({ register, errors }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Chief Name *</label>
                    <input
                        type="text"
                        {...register("chief_name", {
                            required: "Chief name is required",
                            minLength: {
                                value: 2,
                                message: "Chief name must be at least 2 characters"
                            }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.chief_name && <p className="text-red-500 text-sm mt-1">{errors.chief_name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Next of Kin *</label>
                    <input
                        type="text"
                        {...register("next_of_kin", {
                            required: "Next of kin is required",
                            minLength: {
                                value: 2,
                                message: "Next of kin must be at least 2 characters"
                            }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.next_of_kin && <p className="text-red-500 text-sm mt-1">{errors.next_of_kin.message}</p>}
                </div>
            </div>
        </>
    );
};