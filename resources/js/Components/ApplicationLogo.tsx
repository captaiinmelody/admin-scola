import React, { ReactNode } from "react";

const ApplicationLogo = ({
    className,
    children,
}: {
    className: string;
    children?: ReactNode;
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img src="/assets/images/logo.png" alt="" className={className} />
            {children}
        </div>
    );
};

export default ApplicationLogo;
