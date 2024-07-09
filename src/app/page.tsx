"use client";

import StickyNote from "@/components/StickyNote";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { WritingType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [writings, setWritings] = useState<WritingType[]>([]);
    const [writingSearch, setWritingSearch] = useState<string>("");

    useEffect(() => {
        const getWritings = async (): Promise<WritingType[]> => {
            const filterString = writingSearch
                ? `&filters[title][$containsi]=${writingSearch}`
                : "";
            const writingsData = await strapiFetch(
                `writings?populate=*${filterString}`,
                "GET",
            );

            return writingsData;
        };

        getWritings().then((res) => setWritings(res));
    }, [writingSearch]);

    return (
        <div className="flex h-full w-full flex-col items-center">
            <Navbar />

            <form
                className="sticky top-16 z-20 mb-8 mt-4 bg-pink lg:mt-12 xl:mt-12 min-[2560px]:mt-32"
                onSubmit={(e) => {
                    e.preventDefault();
                    inputRef.current?.blur();
                }}
            >
                <input
                    type="text"
                    className="m-0 w-40 bg-white/70 px-4 py-2.5 font-markazi-text text-base active:border-none sm:w-[336px]"
                    placeholder="Search my heart..."
                    ref={inputRef}
                    onChange={(e) => setWritingSearch(e.target.value)}
                ></input>
            </form>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[2560px]:grid-cols-5">
                {writings.map((writing, i) => (
                    <StickyNote
                        key={i}
                        title={writing.attributes.title}
                        slug={writing.attributes.title
                            ?.toLowerCase()
                            .split(" ")
                            .join("-")}
                        type={writing.attributes.type}
                        preview={writing.attributes.preview}
                        colour={writing.attributes.colour}
                    />
                ))}
            </div>
            <div className="min-h-32 w-full bg-transparent"></div>
            <div className="fixed bottom-0 z-20 h-32 w-full bg-gradient-to-t from-pink from-40%"></div>

            <ScrollToTop colour={{ label: "pink", value: "white" }} />
        </div>
    );
}
