import React from "react";

interface ProductFormProps {
    label: string;
    placeholder?: string;
    defaultValue?: string;
    value: string;
    onChange: (value: string) => void;
    isDisabled: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
    label,
    defaultValue,
    value,
    placeholder,
    onChange,
    isDisabled,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg font-semibold">
                {label}
            </label>
            <textarea
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={() => {
                    onChange;
                }}
                disabled={isDisabled}
                className="bg-gray-100 border-gray-300 rounded-md"
            />
        </div>
    );
};

export default ProductForm;
