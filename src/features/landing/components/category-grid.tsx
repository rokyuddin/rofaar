import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const collections = [
    {
        id: "01",
        title: "Worship",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDE58jhTFJeVhOjH4iEJVn-AclzCiGmNzW4jHmh57_zy3a01RqEiFlVZo-sxsMdHSj3ofEPvaVwddsgS-NWPr_2jUKLRB0T1NzvL1RSeGEW9JSAzJJFWjQfZqWf7OXlvMI5aK9_DCCdfAPTAT7UdA_ObHH43-2CaFsgsClu0hI3p2IaEk-iYVuEnJ6YOhDumx1Jkqhq3QAX-xpdB02bGu3V6MTFOGo9o5CvVQ7h86S1nG35D-4_Fifx8qz8TLwaVLFz49171bMDlJWJ",
    },
    {
        id: "02",
        title: "Knowledge",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBJbgPemJ0Bv-qoF-2_y_QscBGTkDKCD4jn7RQRTgt4n_1tGxnzx6Nhey-EQCgZC1WuRs5dGg0CZTCxTeCdHaDXanz3XwVrEdXqSiDSGwfgLqnXiHs1yZHqAfbWlhMSgmBpClc0W-lKWxinwtEg9sqwx-tHYkpUwsIF_CGZWdA92HWzJU1BMAe2U7pbRpsgNQ0u6zTG8EKKjP5LdmKUz373HPFN1MLhT3VU08raxDPW90AQbQBgrgLEOMuPWXXBf_fAxOm6v2Ab1hMI",
    },
    {
        id: "03",
        title: "Lifestyle",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA4JLLu-gqG8eOm5yLgEsntglqIKwi7g_ZyEjNJdId3-wvMZ7umTNr1ttaBBtWJIJL0meZzv5xfedyrghIg7tJTdxdoVe332h9pAityjn-PzaPQqwt0SWhZfKcsh8UrlDmQOwcielTtZTf20tuSjzc3Pz4LSHF5G0lBNWHBEfFc8BVMyw4Abfsbea-tQJZ8gjNK9Xz7negr4DxSEzam1K9fD7DE_921-CIoKBD_U8ABjWhOTigjPnS1fnuTSLVmKwR2ITqz2QfuBIie",
    },
];

export function CategoryGrid() {
    return (
        <section>
            <div className="flex @md/main:flex-row flex-col justify-between items-end gap-4 mb-10">
                <h3 className="font-display font-bold text-3xl">
                    Curated Collections
                </h3>
                <Link
                    className="flex items-center gap-1 font-bold text-primary text-sm decoration-1 hover:underline underline-offset-4 uppercase tracking-widest"
                    href="/categories"
                >
                    View All Categories <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="gap-6 grid grid-cols-1 @md/main:grid-cols-3 auto-rows-[400px]">
                {collections.map((collection) => (
                    <Link
                        key={collection.id}
                        className="group relative bg-surface rounded-sm overflow-hidden"
                        href={`/categories/${collection.title.toLowerCase()}`}
                    >
                        <div className="z-10 absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <Image
                            alt={collection.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            src={collection.image}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="bottom-0 left-0 z-20 absolute p-8 w-full">
                            <span className="block mb-2 font-bold text-white/80 text-xs uppercase tracking-wider">
                                Collection {collection.id}
                            </span>
                            <h4 className="font-display font-bold text-white text-3xl transition-transform group-hover:translate-x-2">
                                {collection.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
