"use client";

import { useState, useEffect } from "react";
import { WritingType } from "@/util/types";

const tinycolor = require("tinycolor2");

export default function WritingVideo({
    colour,
    media,
    gradient,
}: WritingType["attributes"]) {
    const colourNoAlpha = tinycolor(
        colour?.data?.attributes?.hexCode,
    ).toRgbString();
    const colourHalfAlpha = tinycolor(colour?.data?.attributes?.hexCode)
        .setAlpha(0.5)
        .toRgbString();
    const colourFullAlpha = tinycolor(colour?.data?.attributes?.hexCode)
        .setAlpha(0)
        .toRgbString();

    const gradients: { [key: string]: string } = {
        top: `linear-gradient(0deg, ${colourFullAlpha} 70%, ${colourNoAlpha} 90%)`,
        left: `linear-gradient(270deg, ${colourFullAlpha} 70%, ${colourNoAlpha} 90%)`,
        right: `linear-gradient(90deg, ${colourFullAlpha} 70%, ${colourNoAlpha} 90%)`,
        bottom: `linear-gradient(180deg, ${colourFullAlpha} 70%, ${colourNoAlpha} 90%)`,
        radial: `radial-gradient(circle, ${colourFullAlpha} 55%, ${colourNoAlpha} 60%)`,
    };

    const [gradientType, setGradientType] = useState<string>("radial");

    useEffect(() => {
        if (gradient) setGradientType(gradient);
    }, []);

    return (
        <div className="pointer-events-none relative right-0 lg:fixed lg:top-1/2 lg:max-w-[50%] lg:-translate-y-1/2">
            <div
                className="absolute left-0 top-0 z-10 h-full w-full"
                style={{
                    background: gradientType
                        ? gradients[gradientType]
                        : "unset",
                }}
            ></div>{" "}
            <video autoPlay loop muted className="scale-x-[1]">
                {/* <source src={video.url + ".mp4"} type="video/mp4" /> */}
                <source src={media?.data?.attributes?.url} type="video/webm" />
                Your browser does not support the video tag. There would be a
                nice one here...
            </video>
        </div>
    );
}
