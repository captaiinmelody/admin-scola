import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Product, PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import ProductCreate from "./partials/ProductCreate";
import ProductForm from "./partials/ProductForm";
import { useState } from "react";
import {
    CheckIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const ProductPage = ({ auth, products }: PageProps) => {
    console.log(products);
    const [isDisabled, setIsdisabled] = useState<boolean>(true);
    const [productToEdit, setProductToEdit] = useState<Product>();

    const { data, setData, post, progress } = useForm({
        product_name: productToEdit?.product_name,
        tagline: productToEdit?.tagline,
        concept: productToEdit?.concept,
        logo_url: productToEdit?.logo_url,
        overall_concept: productToEdit?.overall_concept,
    });

    const handleEdit = (id: string) => {
        setProductToEdit(products.find((product) => product.id === id));
        setIsdisabled(false);
    };

    const handleCancel = () => {
        setIsdisabled(true);
    };

    const handleSave = () => {
        setIsdisabled(true);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    PRODUCTS
                </h2>
            }
        >
            <Head title="Products" />
            <div className="py-12">
                <div className="wrapper">
                    {/* <div className="w-full flex items-end justify-end">
                        <ProductCreate />
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="w-full shadow-md bg-white rounded-xl p-6 flex flex-col gap-5"
                            >
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold">
                                        {product.product_name}
                                    </h1>
                                    {isDisabled ? (
                                        <div className="flex gap-4 text-white">
                                            <button
                                                onClick={() => {
                                                    handleEdit(product.id);
                                                }}
                                                className="p-2 bg-blue-700 hover:bg-blue-900 rounded-lg"
                                            >
                                                <PencilSquareIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                            <button className="p-2 bg-red-600 hover:bg-red-900 rounded-lg">
                                                <TrashIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4 text-white">
                                            <button
                                                onClick={handleSave}
                                                className="p-2 bg-green-700 hover:bg-green-900 rounded-lg"
                                            >
                                                <CheckIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="p-2 bg-red-600 hover:bg-red-900 rounded-lg"
                                            >
                                                <XMarkIcon
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={() => {}}>
                                    <div className="w-full flex items-center justify-center">
                                        <img
                                            src={product.logo_url}
                                            alt=""
                                            className="w-52 h-52 "
                                        />
                                    </div>
                                    <ProductForm
                                        label="Overall Concept"
                                        isDisabled={isDisabled}
                                        defaultValue={product.overall_concept}
                                        value=""
                                        onChange={function (
                                            value: string
                                        ): void {
                                            throw new Error(
                                                "Function not implemented."
                                            );
                                        }}
                                    />
                                </form>
                            </div>
                        ))}
                        <ProductCreate />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductPage;
