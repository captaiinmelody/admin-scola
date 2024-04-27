import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import AddFeed from "./partials/AddFeed";
import { useEffect } from "react";
import { format } from "date-fns";

const AdsList = ({ auth, feeds, schools, prodi }: PageProps) => {
    const tableLabel = [
        "Nama",
        "Jenis",
        "Mulai Tayang",
        "Selesai Tayang",
        "Jumlah Gambar",
        "",
    ];

    const handleClick = (id: string) => {
        router.delete(`/feeds/${id}`);
    };

    useEffect(() => {
        console.log(typeof feeds[0].mulai_tayang);
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "dd MMMM yyyy, HH:mm:ss"); // Format date as "tanggal bulan tahun, jam:menit:detik"
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Feeds
                </h2>
            }
        >
            <Head title="Headers" />

            <div className="py-12">
                <div className="wrapper">
                    <div className="w-full flex justify-end">
                        <AddFeed schools={schools} prodi={prodi} />
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {tableLabel.map((item, index) => (
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center"
                                            key={index}
                                        >
                                            {index === tableLabel.length - 1 ? (
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
                                {feeds.map((feed, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b text-gray-900 text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                                        >
                                            {feed.nama}
                                        </th>
                                        <td className="px-6 py-4">
                                            {feed.jenis}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(feed.mulai_tayang)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(feed.selesai_tayang)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {feed.feeds_gallery.length}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() =>
                                                        handleClick(
                                                            feed.id_feed!
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdsList;
