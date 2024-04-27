import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

const VerificationSubmission = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Verifikasi Pengajuan Publikasi Sekolah/Program Studi
                </h2>
            }
        >
            {" "}
        </AuthenticatedLayout>
    );
};

export default VerificationSubmission;
