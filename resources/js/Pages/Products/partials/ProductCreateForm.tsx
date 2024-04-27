interface ProductCreateFormProps {
    formId: string;
    label: string;
    // inputName: string;
    placeholder: string;
    value: string;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    isRequired: boolean;
    isOverallConcept: boolean;
}

const ProductCreateForm = ({
    formId,
    label,
    // inputName,
    placeholder,
    value,
    onChange,
    isRequired,
    isOverallConcept,
}: ProductCreateFormProps) => {
    return (
        <div className="wrapper py-4">
            <label
                htmlFor={formId}
                className="block mb-2 text-lg font-semibold text-secondary dark:text-white"
            >
                {label}{" "}
                {isRequired ? <span className="text-red-600">*</span> : ""}
            </label>
            {isOverallConcept ? (
                <textarea
                    id={formId}
                    required={isRequired}
                    name={formId}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            ) : (
                <input
                    id={formId}
                    required={isRequired}
                    type="text"
                    name={formId}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            )}
        </div>
    );
};

export default ProductCreateForm;
