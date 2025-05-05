import { X, PencilLine, Save } from "lucide-react";

export const FormFooter = ({ loading, initialData, onCancel, onSubmit }) => {
    return (
        <div className="border-t pt-4 px-4 sticky bottom-0 bg-white">
            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-ghost flex items-center gap-2"
                    disabled={loading}
                >
                    <X size={18} />
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-primary flex items-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Processing...
                        </>
                    ) : (
                        <>
                            {initialData ? (
                                <>
                                    <PencilLine size={18} />
                                    Update Guard
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Create Guard
                                </>
                            )}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};