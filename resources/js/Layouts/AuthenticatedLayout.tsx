import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { menu_nav } from "@/constants/menu-nav";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <>
            <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 font-univers ${
                    showDropdown ? "" : "-translate-x-full"
                }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <Link
                        href="/"
                        className="pb-1 border-b border-gray-200 flex items-start"
                    >
                        <ApplicationLogo className="w-20 h-20" />
                        <div className="flex flex-col items-start justify-center h-20 text-tertiary">
                            <h3 className="text-xl font-black ">SCOLA</h3>
                            <p className="text-base font-black ">
                                A&ensp;Privilege
                            </p>
                        </div>
                    </Link>
                    <ul className="space-y-2 font-medium pt-2">
                        {menu_nav.map((menu) => (
                            <li key={menu.label}>
                                {menu.children ? (
                                    <button
                                        onClick={toggleDropdown}
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 group hover:border-l-4 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        aria-controls={`dropdown-${menu.label}`}
                                    >
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                            {menu.label}
                                        </span>
                                        <ChevronDownIcon className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <Link
                                        href={menu.route}
                                        onClick={() => {
                                            console.log(menu.route);
                                        }}
                                        className="flex items-center p-2 text-gray-900 dark:text-white hover:border-l-4 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <span className="ms-3">
                                            {menu.label}
                                        </span>
                                    </Link>
                                )}
                                {menu.children && (
                                    <ul
                                        id={`dropdown-${menu.label}`}
                                        className={`py-2 space-y-2 ${
                                            showDropdown ? "" : "hidden"
                                        }`}
                                    >
                                        {menu.children.map((child) => (
                                            <li key={child.label}>
                                                <Link
                                                    href={child.route}
                                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 pl-11 group hover:border-l-4 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profil Akun
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Keluar
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </ul>
                </div>
            </aside>
            <div className="min-h-screen bg-gray-100 sm:ml-64 font-univers">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </>
    );
}
