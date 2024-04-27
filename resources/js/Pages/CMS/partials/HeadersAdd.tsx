import { Header, ChildrenHeaders } from "@/types";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";
import { useState } from "react";

const HeadersAdd = () => {
    const [headers, setHeaders] = useState<Header>({
        label: "",
        route: "",
    });
    const [childrenHeaders, setChildrenHeaders] = useState<ChildrenHeaders[]>([
        {
            label: "",
            route: "",
            parent_label: "",
        },
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setHeaders({
            label: "",
            route: "",
        });
        setChildrenHeaders([]);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        isChildren: boolean,
        index?: number
    ) => {
        const { name, value } = e.target;
        let updatedValue = value.trim().toLowerCase();
        updatedValue = updatedValue.replace(/\s+/g, "-");
        updatedValue = `/${updatedValue}`;

        if (isChildren) {
            const updatedChildrenHeaders = [...childrenHeaders];
            updatedChildrenHeaders[index!] = {
                ...updatedChildrenHeaders,
                label: value,
                route: updatedValue,
                parent_label: headers.label,
            };
            setChildrenHeaders(updatedChildrenHeaders);
        } else {
            setHeaders((prevState) => ({
                ...prevState,
                [name]: value,
                route: updatedValue,
            }));
        }
    };

    const addChildrenHeader = () => {
        setChildrenHeaders([
            ...childrenHeaders,
            { label: "", route: "", parent_label: "" },
        ]);
    };

    const removeChildrenHeader = (index: number) => {
        const updatedChildrenHeaders = [...childrenHeaders];
        updatedChildrenHeaders.splice(index, 1);
        setChildrenHeaders(updatedChildrenHeaders);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            headers: headers,
            childrenHeaders: childrenHeaders,
        };

        try {
            await router.post("/web/headers", payload);
            closeModal();
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
                Add Headers
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
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Add Header
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
                            <form onSubmit={handleSubmit}>
                                <div className="wrapper py-4">
                                    <label
                                        htmlFor="Header Label"
                                        className="block mb-2 text-lg font-medium text-secondary dark:text-white"
                                    >
                                        Header Label
                                    </label>
                                    <input
                                        type="text"
                                        name="label"
                                        value={headers.label}
                                        onChange={(e) => handleChange(e, false)}
                                        placeholder="Label"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {childrenHeaders.map(
                                        (childHeader, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center mt-4"
                                            >
                                                <input
                                                    type="text"
                                                    name="label"
                                                    value={childHeader.label}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e,
                                                            true,
                                                            index
                                                        )
                                                    }
                                                    placeholder="Dropdown"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeChildrenHeader(
                                                            index
                                                        )
                                                    }
                                                    className="ml-2 text-xl text-red-500 hover:text-white focus:outline-none border-2 border-red-500 hover:bg-red-500 py-1 px-2 rounded-md"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={addChildrenHeader}
                                        className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                                    >
                                        + Add Child Header
                                    </button>
                                </div>
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

export default HeadersAdd;
