"use client";

import React, { useRef } from "react";
import BackFlap from "./BackFlap";
import WritingVideo from "./WritingVideo";
import { WritingType } from "@/util/types";
import ScrollToTop from "./ScrollToTop";

const tinycolor = require("tinycolor2");

export default function Writing({
    title,
    type,
    content,
    writingMedia,
    gradient,
    colour,
}: WritingType["attributes"]) {
    const topRef = useRef<HTMLDivElement>(null);

    const textColour =
        tinycolor(colour?.data.attributes.hexCode).getLuminance() >= 0.5
            ? "black"
            : "white";

    return (
        <div
            style={{
                backgroundColor: colour?.data.attributes.hexCode,
                color: textColour,
            }}
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
            <div
                className="xs:h-20 z-10 mx-0 w-max max-w-[80%] py-20 font-marck-script max-lg:mx-[10%] sm:py-40 md:py-40 lg:relative lg:left-[20%] lg:max-w-[30%] lg:py-48"
                style={{ backgroundColor: colour?.data.attributes.hexCode }}
            >
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
            {writingMedia?.data && (
                <WritingVideo
                    colour={colour}
                    writingMedia={writingMedia}
                    gradient={gradient}
                />
            )}
            <ScrollToTop colour={textColour} />
        </div>
    );
}
