import TextInput from "@/Components/TextInput";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { router, useForm } from "@inertiajs/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FeedTextField from "./FeedTextField";
import TypeFeed from "./TypeFeed";
import ChooseDisplayedLength from "./ChooseDisplayedLength";
import ImageUpload from "./ImageUpload";
import SchoolSelection from "./SchoolSelection";
import { Prodi, Schools } from "@/types";
import ProdiSelection from "./ProdiSelection";
import CustomDatePicker from "./CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";

const AddFeed = ({
    schools,
    prodi,
}: {
    schools: Schools[];
    prodi: Prodi[];
}) => {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            nama: "",
            jenis: "",
            keterangan: "",
            cp: "",
            mulai_tayang: "",
            selesai_tayang: "",
            id_sekolah: "",
            id_prodi: "",
            images: [],
        });

    const [isOpen, setIsOpen] = useState(false);
    const [isPost, setIsPost] = useState(false);
    const [isPostProdi, setIsPostProdi] = useState(false);

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {});

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        reset(
            "nama",
            "jenis",
            "keterangan",
            "cp",
            "mulai_tayang",
            "selesai_tayang",
            "images",
            "id_sekolah",
            "id_prodi"
        );

        setIsPost(false);
        setIsPostProdi(false);
        setStartDate(null);
        setEndDate(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(data);

        try {
            post(route("feeds.store"), { onSuccess: () => closeModal() });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* Modal toggle */}
            <button
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Tambahkan Feed
            </button>

            {/* Main modal */}
            {isOpen && (
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-2xl h-screen">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow h-full">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t h-1/6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Tambah Feed
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <XMarkIcon />
                                </button>
                            </div>
                            {/* Modal body */}
                            <form
                                onSubmit={handleSubmit}
                                className="h-5/6 overflow-y-auto"
                            >
                                <FeedTextField
                                    htmlFor="Feed Label"
                                    label="Nama Feed"
                                    placeholder="Masukkan nama feeds"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />

                                <FeedTextField
                                    htmlFor="Contact Person"
                                    label="Contact Person"
                                    placeholder="Masukkan Contact Person (Nomor Tlp, Alamat Email, dll.)"
                                    value={data.cp}
                                    onChange={(e) =>
                                        setData("cp", e.target.value)
                                    }
                                />

                                <TypeFeed
                                    htmlFor="Feed Type"
                                    label="Jenis Feed"
                                    value={data.jenis}
                                    onChange={(e) => {
                                        setData("jenis", e.target.value);
                                        if (e.target.value === "post_prodi") {
                                            setIsPostProdi(true);
                                        } else if (e.target.value === "post") {
                                            setIsPostProdi(false);
                                            setIsPost(true);
                                        } else {
                                            setIsPostProdi(false);
                                            setIsPost(false);
                                        }
                                    }}
                                />

                                {isPost && (
                                    <>
                                        <FeedTextField
                                            htmlFor="Feed Description"
                                            label="Keterangan"
                                            value={data.keterangan}
                                            placeholder="Masukkan keterangan"
                                            onChange={(e) =>
                                                setData(
                                                    "keterangan",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                )}

                                {isPostProdi && (
                                    <>
                                        <SchoolSelection
                                            htmlFor="School Selection"
                                            label="Pilih Sekolah"
                                            value={data.id_sekolah}
                                            schools={schools}
                                            onChange={(e) => {
                                                setData(
                                                    "id_sekolah",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <ProdiSelection
                                            htmlFor="Prodi Selection"
                                            label="Pilih Prodi"
                                            value={data.id_prodi}
                                            prodi={prodi}
                                            id_sekolah={data.id_sekolah}
                                            onChange={(e) => {
                                                setData(
                                                    "id_prodi",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </>
                                )}

                                <div className="wrapper pt-4">
                                    <h3 className="block mb-2 text-lg font-medium text-secondary dark:text-white">
                                        Waktu Tayang
                                    </h3>
                                    <div className="flex justify-between pt-4">
                                        <CustomDatePicker
                                            label="Pilih tanggal mulai tayang"
                                            value={startDate}
                                            onChange={(value) => {
                                                setStartDate(value);
                                                setData(
                                                    "mulai_tayang",
                                                    dayjs(value).format(
                                                        "YYYY-MM-DD HH:mm:ss"
                                                    )
                                                );
                                            }}
                                        />

                                        <CustomDatePicker
                                            label="Pilih tanggal selesai tayang"
                                            value={endDate}
                                            onChange={(value) => {
                                                setEndDate(value);
                                                setData(
                                                    "selesai_tayang",
                                                    dayjs(value).format(
                                                        "YYYY-MM-DD HH:mm:ss"
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <ImageUpload
                                    htmlFor="avatar"
                                    label="Upload Image (Max 5)"
                                    onChange={(e) =>
                                        // @ts-ignore
                                        setData("images", e.target.files)
                                    }
                                />
                                {/* Progress bar for image upload */}
                                {progress && (
                                    <progress
                                        value={progress.percentage}
                                        max="100"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}

                                <div className="pt-6">
                                    <div className="flex items-center justify-end p-4 border-t">
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddFeed;
