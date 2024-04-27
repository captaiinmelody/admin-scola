import ApplicationLogo from "@/Components/ApplicationLogo";
import ApplicationTitle from "@/Components/ApplicationTitle";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center  sm:pt-0 bg-gray-100 font-univers pb-20">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-52 h-52" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
