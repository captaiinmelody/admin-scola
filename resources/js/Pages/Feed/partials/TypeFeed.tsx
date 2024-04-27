import React, { ChangeEvent } from "react";

const TypeFeed = ({
    htmlFor,
    label,
    value,
    onChange,
}: {
    htmlFor: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
    // Define the options array including the initial placeholder
    const options = [
        { value: "", label: "Pilih jenis feed", hidden: true, disabled: true }, // Initial placeholder option
        { value: "ads", label: "Iklan" },
        { value: "post", label: "Post" },
        { value: "post_prodi", label: "Post Prodi" },
    ];

    return (
        <div className="wrapper pt-4">
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-lg font-medium text-secondary dark:text-white"
            >
                {label}
            </label>

            <select
                required
                id={htmlFor}
                name={htmlFor}
                value={value}
                onChange={onChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        hidden={option.hidden}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeFeed;
