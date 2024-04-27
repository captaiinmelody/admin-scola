import { XMarkIcon } from "@heroicons/react/16/solid";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import ProductCreateForm from "./ProductCreateForm";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const ProductCreate = () => {
    const { data, setData, post, progress } = useForm({
        product_name: "",
        tagline: "",
        concept: "",
        overall_concept: "",
        logo: null,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>("");

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(data);
        try {
            await post("/products");
            // router.visit(`/products`);
        } catch (error) {
            console.log(e);
        }
    };

    return (
        <>
            {/* Modal toggle */}
            <button
                onClick={openModal}
                className="w-full shadow-md group bg-gray-200 hover:bg-gray-300 rounded-xl p-6 flex justify-center items-center cursor-pointer"
                type="button"
            >
                <PlusCircleIcon
                    width={52}
                    height={52}
                    className="group-hover:text-gray-100"
                />
            </button>

            {/* Main modal */}
            {isOpen && (
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-2xl">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Add Product
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <XMarkIcon />
                                </button>
                            </div>
                            <form
                                className="h-[540px] overflow-y-auto"
                                onSubmit={handleSubmit}
                            >
                                <div className="px-6 pt-4">
                                    <label
                                        htmlFor="files"
                                        className="block mb-2 text-lg font-semibold text-secondary dark:text-white"
                                    >
                                        Logo
                                        <span className="text-tertiary">*</span>
                                    </label>
                                    <input
                                        id="files"
                                        type="file"
                                        className=""
                                        onChange={(e) => {
                                            // @ts-ignore
                                            setData("logo", e.target.files[0]);
                                            setPreviewImage(
                                                URL.createObjectURL(
                                                    // @ts-ignore
                                                    e.target.files[0]
                                                )
                                            );
                                        }}
                                    />
                                </div>
                                {previewImage && (
                                    <div className="px-6 pt-4 flex justify-center w-full">
                                        <img
                                            className="preview h-52 w-52 object-scale-down"
                                            src={previewImage}
                                            alt=""
                                        />
                                    </div>
                                )}
                                <ProductCreateForm
                                    formId="product_name"
                                    isRequired={true}
                                    label="Product Name"
                                    // inputName="product_name"
                                    placeholder="input product name..."
                                    value={data.product_name}
                                    onChange={(e) =>
                                        setData("product_name", e.target.value)
                                    }
                                    isOverallConcept={false}
                                />
                                <ProductCreateForm
                                    formId="tagline"
                                    isRequired={false}
                                    label="Tagline"
                                    // inputName="tagline"
                                    placeholder="input tagline..."
                                    value={data.tagline}
                                    onChange={(e) =>
                                        setData("tagline", e.target.value)
                                    }
                                    isOverallConcept={false}
                                />
                                <ProductCreateForm
                                    formId="concept"
                                    isRequired={false}
                                    label="Concept"
                                    // inputName="concept"
                                    placeholder="input concept..."
                                    value={data.concept}
                                    onChange={(e) =>
                                        setData("concept", e.target.value)
                                    }
                                    isOverallConcept={false}
                                />
                                <ProductCreateForm
                                    formId="overall_concept"
                                    isRequired={true}
                                    label="Overall Concept"
                                    // inputName="overall_concept"
                                    placeholder="input overall concept..."
                                    value={data.overall_concept}
                                    onChange={(e) =>
                                        setData(
                                            "overall_concept",
                                            e.target.value
                                        )
                                    }
                                    isOverallConcept={true}
                                />
                                {progress && (
                                    <progress
                                        value={progress.percentage}
                                        max={100}
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}
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
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCreate;
