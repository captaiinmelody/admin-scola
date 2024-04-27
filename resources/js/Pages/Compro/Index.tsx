import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import About from "./partials/About";
import Rekening from "./partials/Rekening";

const CompanyProfile = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile SCOLA
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <About />
                    <Rekening className="mt-2" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CompanyProfile;
