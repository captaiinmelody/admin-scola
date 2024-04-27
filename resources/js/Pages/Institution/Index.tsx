import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import React from "react";

const Institution = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Institusi
                </h2>
            }
        >
            {" "}
        </AuthenticatedLayout>
    );
};

export default Institution;
