export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type Header = {
    id?: string;
    label: string;
    route: string;
    children?: ChildrenHeaders[];
};

export type ChildrenHeaders = {
    id?: string;
    label: string;
    route: string;
    parent_label?: string;
};

export type Product = {
    id: string;
    product_name: string;
    tagline: string;
    concept: string;
    logo_url: string;
    overall_concept: string;
};

export interface Feed {
    id_feed: string;
    nama: string;
    jenis: string;
    keterangan: string;
    cp: string;
    mulai_tayang: string;
    selesai_tayang: string;
    feeds_gallery: string[];
}

export interface FeedGallery {
    id_feed: string;
    id_feed_gallery: string;
    url: string;
}

export interface Schools {
    id_sekolah: string;
    nama_sekolah: string;
}

export interface Prodi {
    id_sekolah: string;
    id_program_studi: string;
    nama_program_studi: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    headers: Header[];
    headerProps: Header;
    products: Product[];
    feeds: Feed[];
    feedsGallery: FeedGallery[];
    schools: Schools[];
    prodi: Prodi[];
};
