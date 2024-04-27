import { Prodi } from "@/types";
import { ChangeEvent } from "react";

const ProdiSelection = ({
    htmlFor,
    label,
    value,
    onChange,
    prodi,
    id_sekolah,
}: {
    htmlFor: string;
    label: string;
    value: string;
    prodi: Prodi[];
    id_sekolah: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) => {
    const filteredProdi = prodi.filter(
        (item) => item.id_sekolah === id_sekolah
    );
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

                {filteredProdi.map((option) => (
                    <option
                        key={option.id_program_studi}
                        value={option.id_program_studi}
                    >
                        {option.nama_program_studi}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProdiSelection;
