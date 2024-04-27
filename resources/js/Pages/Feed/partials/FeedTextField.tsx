import TextInput from "@/Components/TextInput";
import React, { ChangeEvent } from "react";

const FeedTextField = ({
    htmlFor,
    label,
    value,
    placeholder,
    type = "text",
    onChange,
}: {
    htmlFor: string;
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="wrapper pt-4">
            <label
                htmlFor={htmlFor}
                className="block mb-2 text-lg font-medium text-secondary dark:text-white"
            >
                {label}
            </label>

            <TextInput
                required
                type={type}
                placeholder={placeholder}
                className="w-full"
                name="nama"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FeedTextField;
