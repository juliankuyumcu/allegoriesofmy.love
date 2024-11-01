"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import StickyNote from "./StickyNote";
import { strapiFetch } from "@/util/fetch";
import { WritingType } from "@/util/types";
import { delay } from "@/util/delay";
import { getPageSize } from "@/util/pagination";
import { useInView } from "react-intersection-observer";
import StickyNotePlaceholder from "./StickyNotePlaceholder";

export default function StickyNoteGrid() {
    let scrollYV = 0;

    // TODO: Maybe improve page size determination because if page size is wrong, fast loading can mess up

    const [mounted, setMounted] = useState(false);

    const [pageSize, setPageSize] = useState<number>(
        mounted ? parseInt(sessionStorage?.getItem("pageSize") || "") : 0,
    );
    const [pages, setPages] = useState<number[]>([]);
    const [gotInitWritings, setGotInitWritings] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const [writingSearch, setWritingSearch] = useState<string>("");

    const [writings, setWritings] = useState<WritingType[]>(
        mounted
            ? new Array(
                  (sessionStorage
                      ?.getItem("pages")
                      ?.split(",")
                      ?.map((e) => parseInt(e))[2] || 0) * pageSize,
              ).fill(null)
            : [],
    );
    const [maxPage, setMaxPage] = useState<number>(3);

    const [topIntersectionObserver, topInView] = useInView();
    const [bottomIntersectionObserver, bottomInView] = useInView();

    const scrollYRef = useRef<number | null>(null);

    const isFetchingRef = useRef({ up: false, down: false });

    const getWritings = async () => {
        if (!pageSize || !pages.length || gotInitWritings) return;

        const writingsRes = await Promise.all(
            pages.filter(Boolean).map(
                (page: number): Promise<{ data: WritingType[]; meta: any }> =>
                    strapiFetch({
                        method: "GET",
                        slug: "writings",
                        populate: {
                            0: "colour",
                            colour: {
                                fields: {
                                    0: "hexCode",
                                },
                            },
                        },
                        fields: ["title", "type", "preview", "slug"],
                        pagination: {
                            pageSize: pageSize,
                            page: page,
                        },
                        ...(writingSearch && {
                            filters: {
                                title: {
                                    $containsi: writingSearch,
                                },
                            },
                        }),
                    }),
            ),
        );

        let writings: WritingType[] = [];
        writingsRes.forEach((res) => {
            writings.push(...res.data);
        });

        if (pages[0] > 1) {
            const numPlaceholders = Math.max((pages[0] - 1) * pageSize, 0);

            writings = [...new Array(numPlaceholders).fill(null), ...writings];
        }

        setWritings(writings);
        setGotInitWritings(true);
        setMaxPage(writingsRes[0].meta.pagination.pageCount);
    };

    const getMoreWritingsDown = async () => {
        if (isFetchingRef.current.down || pages[2] === maxPage) return;

        isFetchingRef.current.down = true;
        const nextPage = pages[2] + 1;

        const newWritings = await strapiFetch({
            method: "GET",
            slug: "writings",
            populate: {
                0: "colour",
                colour: {
                    fields: ["hexCode"],
                },
            },
            fields: ["title", "type", "preview", "slug"],
            pagination: {
                pageSize: pageSize,
                page: nextPage,
            },
        });

        if (newWritings?.data?.length) {
            setWritings((prevWritings: WritingType[]) => {
                const joinedWritings = [
                    ...prevWritings.filter(Boolean),
                    ...newWritings.data,
                ];
                return [
                    ...new Array(Math.max(pages[0], 0) * pageSize).fill(null),
                    ...joinedWritings.slice(pageSize),
                ];
            });
            sessionStorage.setItem(
                "pages",
                `${pages[0] + 1},${pages[1] + 1},${pages[2] + 1}`,
            );
            setPages([pages[0] + 1, pages[1] + 1, pages[2] + 1]);
        }

        isFetchingRef.current.down = false;
    };

    const getMoreWritingsUp = async () => {
        if (isFetchingRef.current.up || pages[0] === 1) return;

        isFetchingRef.current.up = true;

        const prevPage = pages[0] - 1;

        const newWritings = await strapiFetch({
            method: "GET",
            slug: "writings",
            populate: {
                0: "colour",
                colour: {
                    fields: ["hexCode"],
                },
            },
            fields: ["title", "type", "preview", "slug"],
            pagination: {
                pageSize: pageSize,
                page: prevPage || 1,
            },
        });

        if (newWritings?.data?.length) {
            setWritings((prevWritings: WritingType[]) => {
                const joinedWritings = [
                    ...newWritings.data,
                    ...prevWritings.filter(Boolean),
                ];
                return [
                    ...new Array(Math.max(pages[0] - 2, 0) * pageSize).fill(
                        null,
                    ),
                    ...joinedWritings.slice(0, pageSize * 3),
                ];
            });
            sessionStorage.setItem(
                "pages",
                `${pages[0] - 1},${pages[1] - 1},${pages[2] - 1}`,
            );
            setPages([pages[0] - 1, pages[1] - 1, pages[2] - 1]);
        }

        isFetchingRef.current.up = false;
    };

    useEffect(() => {
        if (bottomInView && !topInView && !isFetchingRef.current.down) {
            getMoreWritingsDown();
        }
    }, [topInView, bottomInView, writings]);

    useEffect(() => {
        if (topInView && !bottomInView && !isFetchingRef.current.up) {
            getMoreWritingsUp();
        }
    }, [topInView, bottomInView, writings]);

    useEffect(() => {
        if (!mounted) return;
        setPageSize(getPageSize() || 4);

        if (!sessionStorage.getItem("pages")) {
            sessionStorage.setItem("pages", "1,2,3");
        }

        setPages(
            sessionStorage
                .getItem("pages")
                ?.split(",")
                .map((e) => parseInt(e)) || [1, 2, 3],
        );
        sessionStorage.setItem("pageSize", getPageSize().toString());
    }, [mounted]);

    useEffect(() => {
        const getInitialWritings = async () => {
            await getWritings();
            setMounted(true);
        };

        getInitialWritings();
    }, [pages, pageSize]);

    const onScroll = () => {
        const { scrollY } = window;
        if (scrollY === 0) return;

        scrollYRef.current = scrollY;
        sessionStorage.setItem("sy", scrollY.toString());
    };

    useEffect(() => {
        if (!gotInitWritings || !mounted) {
            return;
        }

        setGotInitWritings(false);
        setPages([1, 2, 3]);

        window.scrollTo(0, 0);
        sessionStorage.removeItem("sy");
        sessionStorage.setItem("pages", "1,2,3");
    }, [writingSearch]);

    useEffect(() => {
        if (!gotInitWritings || !mounted || !writings.length) return;

        window.scrollTo(0, parseInt(sessionStorage.getItem("sy") || "") || 0);

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [gotInitWritings]);

    return (
        <div>
            <form
                className="sticky top-16 z-20 mx-auto mb-8 mt-4 w-min bg-pink lg:mt-12 xl:mt-12 min-[2560px]:mt-32"
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
                {writings.length > 0 &&
                    mounted &&
                    writings.map((writing: WritingType, i: number) => {
                        const ref =
                            i === 1 || i === writings.findIndex(Boolean)
                                ? topIntersectionObserver
                                : i === writings.length - 1
                                  ? bottomIntersectionObserver
                                  : null;

                        return !writing ? (
                            <div key={i} ref={ref}>
                                <StickyNotePlaceholder />
                            </div>
                        ) : (
                            <div ref={ref}>
                                <StickyNote
                                    key={writing.attributes.slug || i}
                                    index={
                                        !sessionStorage.getItem(
                                            "feedHasAnimatedOnce",
                                        )
                                            ? i
                                            : 0
                                    }
                                    title={writing.attributes.title}
                                    slug={writing.attributes.slug}
                                    type={writing.attributes.type}
                                    preview={writing.attributes.preview}
                                    colour={writing.attributes.colour}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
