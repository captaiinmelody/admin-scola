import React, { ChangeEvent } from "react";

const ImageUpload = ({
    htmlFor,
    label,
    onChange,
}: {
    htmlFor: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="wrapper py-4">
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-lg font-medium text-secondary dark:text-white"
            >
                {label}
            </label>

            <input
                type="file"
                id={htmlFor}
                name={htmlFor}
                accept="image/*"
                onChange={onChange}
                multiple
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
        </div>
    );
};

export default ImageUpload;
