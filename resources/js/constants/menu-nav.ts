export const menu_nav = [
    {
        label: "Dasbor",
        route: "/dashboard",
    },
    {
        label: "Website SCOLA",
        route: "/web",
        children: [
            {
                label: "Profile SCOLA",
                route: "/compro",
            },
            {
                label: "Header",
                route: "/web/headers",
            },
            {
                label: "Footer",
                route: "/web/footer",
            },
            {
                label: "Beranda",
                route: "/web/home",
            },
            {
                label: "Berita",
                route: "/web/news",
            },
        ],
    },
    {
        label: "Produk",
        route: "/products",
    },
    {
        label: "Iklan",
        route: "/feeds",
    },
    {
        label: "Verifikasi Pengajuan Publikasi Sekolah/PRODI",
        route: "/verification-submission",
    },
];
