export const FormMessage = ({ message }) => {
    if (!message?.text) return null;

    return (
        <div className={`p-3 rounded-md ${message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {message.text}
        </div>
    );
};