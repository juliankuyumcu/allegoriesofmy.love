"use client";

import React, { useRef } from "react";
import BackFlap from "./BackFlap";
import WritingVideo from "./WritingVideo";
import { WritingType } from "@/util/types";
import ScrollToTop from "./ScrollToTop";

export default function Writing({
    title,
    type,
    content,
    media,
    gradient,
    colour,
}: WritingType["attributes"]) {
    const topRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative h-screen w-full overflow-x-hidden overflow-y-scroll"
            style={{ backgroundColor: colour?.data?.attributes?.hexCode }}
        >
            <div
                className="absolute left-0 top-0 -z-10 h-0 w-0"
                ref={topRef}
            ></div>
            <BackFlap colour={colour} />
            <div
                className="fixed top-0 z-20 h-20 w-full sm:h-40 md:h-40 lg:h-48"
                style={{
                    background: `linear-gradient(180deg, ${colour?.data?.attributes?.hexCode} 60%, transparent 100%)`,
                }}
            ></div>
            <div className="z-10 mx-0 w-max max-w-[80%] font-marck-script max-lg:mx-[10%] max-lg:mt-[20%] lg:absolute lg:left-[20%] lg:top-[17%] lg:max-w-[30%] lg:pb-40">
                <h1 className="mb-4 text-2xl md:text-[40px]">{title}</h1>
                <p className="whitespace-pre-line text-base md:text-2xl">
                    {content}
                </p>
            </div>
            <div
                className="fixed bottom-0 z-20 h-20 w-full sm:h-40 md:h-40 lg:h-48"
                style={{
                    background: `linear-gradient(0deg, ${colour?.data?.attributes?.hexCode} 60%, transparent 100%)`,
                }}
            ></div>
            {media?.data && (
                <WritingVideo
                    colour={colour}
                    media={media}
                    gradient={gradient}
                />
            )}
            <ScrollToTop
                container={topRef.current}
                colour={{ label: "", value: "white" }}
            />
        </div>
    );
}
