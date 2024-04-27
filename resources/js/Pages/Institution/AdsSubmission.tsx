import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

const AdsSubmission = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengajuan Iklan
                </h2>
            }
        >
            {" "}
        </AuthenticatedLayout>
    );
};

export default AdsSubmission;
