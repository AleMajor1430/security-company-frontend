import { useRef } from "react";
import { UploadCloud, FileText } from "lucide-react";

export const FileUpload = ({
    label,
    name,
    register,
    errors,
    required = false,
    onUpload,
    currentFile
}) => {
    const fileInputRef = useRef();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Mock upload logic - replace with real upload function
            const formData = new FormData();
            formData.append("file", file);

            // Example: simulate uploading and returning a URL
            const fileUrl = URL.createObjectURL(file); // Replace this with actual URL from server
            onUpload(fileUrl);
        } catch (error) {
            console.error("File upload failed", error);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>

            <div className="flex items-center space-x-4">
                <button
                    type="button"
                    className="btn btn-outline btn-sm flex items-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <UploadCloud size={16} />
                    Upload File
                </button>

                {currentFile && (
                    <a
                        href={currentFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm flex items-center gap-1"
                    >
                        <FileText size={16} /> View file
                    </a>
                )}
            </div>

            <input
                type="file"
                accept="application/pdf,image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Register hidden input to react-hook-form */}
            <input
                type="hidden"
                {...register(name, {
                    required: required ? `${label} is required` : false
                })}
            />

            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
            )}
        </div>
    );
};
