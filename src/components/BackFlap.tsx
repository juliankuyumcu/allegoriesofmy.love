"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSpring, animated } from "@react-spring/web";
import { ColourType } from "@/util/types";

const tinycolor = require("tinycolor2");

export default function BackFlap({ colour }: { colour?: ColourType }) {
    const router = useRouter();

    const luminanceIsBright =
        tinycolor(colour?.data.attributes.hexCode).getLuminance() >= 0.5;

    const backgroundColour = luminanceIsBright
        ? tinycolor(colour?.data?.attributes?.hexCode).lighten(5).toString()
        : tinycolor(colour?.data.attributes.hexCode).darken(5).toString();
    const colour1 = luminanceIsBright
        ? tinycolor(colour?.data?.attributes?.hexCode).darken(5).toString()
        : tinycolor(colour?.data.attributes.hexCode).lighten(15).toString();
    const colour2 = luminanceIsBright
        ? tinycolor(colour?.data?.attributes?.hexCode).darken(15).toString()
        : tinycolor(colour?.data.attributes.hexCode).lighten(45).toString();

    const backgroundPathInitial = "M160 0 0 160V0h160Z";
    const backgroundPathHover = "M200 0 0 200V0h200Z";

    const flapPathInitial =
        "M0 160 160 0s-23 31-28 80c-2 21 2 72 2 72s-26-10-61-10-73 18-73 18Z";
    const flapPathHover =
        "M0 200 200 0s-29 39-35 100c-2 26 2 90 2 90s-31-13-75-13-92 23-92 23Z";

    const [spring, springApi] = useSpring(() => ({
        backgroundD: backgroundPathInitial,
        flapD: flapPathInitial,
    }));

    const openFlap = () => {
        springApi.start({
            backgroundD: backgroundPathHover,
            flapD: flapPathHover,
        });
    };

    const closeFlap = () => {
        springApi.start({
            backgroundD: backgroundPathInitial,
            flapD: flapPathInitial,
        });
    };

    return (
        <div
            className="fixed z-30 float-left h-min w-min"
            onMouseEnter={() => {
                openFlap();
            }}
            onMouseLeave={() => {
                closeFlap();
            }}
        >
            <animated.svg
                className="relative left-0 top-0 z-30 float-left w-16 hover:cursor-pointer sm:w-40 md:w-40 lg:w-48"
                viewBox="0 1 200 200"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit={2}
            >
                <animated.path d={spring.backgroundD} fill={backgroundColour} />
                <animated.path d={spring.flapD} fill="url(#back-flap)" />
                <animated.defs>
                    <linearGradient
                        id="back-flap"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(80 80 -80 80 80 80)"
                    >
                        <stop offset="0" stopColor={colour2} stopOpacity={1} />
                        <stop offset="1" stopColor={colour1} stopOpacity={1} />
                    </linearGradient>
                </animated.defs>
            </animated.svg>
            <Link
                scroll={false}
                href="/"
                onClick={() => router.back()}
                className="absolute left-0 top-0 z-30 h-full w-full"
            ></Link>
        </div>
    );
}
