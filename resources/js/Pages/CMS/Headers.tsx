import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import HeadersAdd from "./partials/HeadersAdd";
import HeadersEdit from "./partials/HeadersEdit";

const Headers = ({ auth, headers }: PageProps) => {
    const tableLable = ["Label", "Link", "Dropdown", "Edit"];

    const handleClick = (id: string) => {
        router.delete(`/web/headers/${id}`);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    HEADERS
                </h2>
            }
        >
            <Head title="Headers" />

            <div className="py-12">
                <div className="wrapper">
                    {headers === null || headers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-10">
                            <h1 className="text-5xl font-bold">
                                There is no Headers data yet
                            </h1>
                            <HeadersAdd />
                        </div>
                    ) : (
                        <>
                            <div className="w-full flex justify-end">
                                <HeadersAdd />
                            </div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
                                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            {tableLable.map((item, index) => (
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                    key={index}
                                                >
                                                    {index ===
                                                    tableLable.length - 1 ? (
                                                        <span className="sr-only">
                                                            {item}
                                                        </span>
                                                    ) : (
                                                        item
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {headers.map((header, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {header.label}
                                                </th>
                                                <td className="px-6 py-4 text-gray-900">
                                                    {header.route}
                                                </td>
                                                <td className="px-6 py-4 w-1/5 text-gray-900">
                                                    {header.children?.length ===
                                                    0 ? (
                                                        <span className="font-bold">
                                                            -
                                                        </span>
                                                    ) : (
                                                        header.children?.map(
                                                            (child, index) => (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {
                                                                        child.label
                                                                    }
                                                                    <span>
                                                                        {index !==
                                                                            header.children!
                                                                                .length -
                                                                                1 &&
                                                                            ", "}
                                                                    </span>
                                                                </span>
                                                            )
                                                        )
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        <HeadersEdit
                                                            headerProps={header}
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                handleClick(
                                                                    header.id!
                                                                )
                                                            }
                                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Headers;
