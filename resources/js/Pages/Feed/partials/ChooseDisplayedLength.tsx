import React, { ChangeEvent } from "react";

const ChooseDisplayedLength = ({
    htmlFor,
    label,
    value,
    onChange,
}: {
    htmlFor: string;
    label: string;
    value: number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
    // Generate options for days from 1 to 30
    const options = Array.from({ length: 30 }, (_, index) => ({
        value: index + 1,
        label: `${index + 1} hari`, // Append 's' for plural days
    }));

    return (
        <div className="wrapper py-4">
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-lg font-medium text-secondary dark:text-white"
            >
                {label}
            </label>

            <select
                id={htmlFor}
                name={htmlFor}
                value={value}
                onChange={onChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
                {/* Placeholder option */}
                <option value="" disabled hidden>
                    Pilih berapa hari feed akan ditayangkan
                </option>
                {/* Options for days */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChooseDisplayedLength;
