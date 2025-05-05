export const FormSection = ({ title, icon: Icon, children }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2 flex items-center gap-2">
                {Icon && <Icon size={18} />}
                {title}
            </h3>
            {children}
        </div>
    );
};