import { Schools } from "@/types";
import { router, usePage } from "@inertiajs/react";
import React, { ChangeEvent, useEffect, useState } from "react";

const SchoolSelection = ({
    htmlFor,
    label,
    value,
    onChange,
    schools,
}: {
    htmlFor: string;
    label: string;
    value: string;
    schools: Schools[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
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
                <option value="" hidden disabled>
                    Pilih Sekolah
                </option>

                {schools.map((option) => (
                    <option key={option.id_sekolah} value={option.id_sekolah}>
                        {option.nama_sekolah}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SchoolSelection;
