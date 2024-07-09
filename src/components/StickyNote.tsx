"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { init } from "next/dist/compiled/webpack/webpack";
import styles from "@/styles/StickyNote.module.css";
import { WritingType } from "@/util/types";

const tinycolor = require("tinycolor2");

export default function StickyNote({
    title,
    slug,
    type,
    preview,
    colour,
}: WritingType["attributes"]) {
    const darkerColor: string = tinycolor(colour?.data?.attributes?.hexCode)
        .darken(10)
        .toString();
    const darkestColor: string = tinycolor(colour?.data?.attributes?.hexCode)
        .darken(12)
        .toString();

    // set 1 - curvy
    // M280 280a33 33 0 0 0 16 0l-16 16a33 33 0 0 0 0-16Z
    // M264 264a66 66 0 0 0 32 0l-32 32a66 66 0 0 0 0-32Z

    // set 2 - simple
    // M280 280h16l-16 16v-16Z
    // M264 264h32l-32 32v-32Z

    const notePathInitial = "M0 0h296v280l-8 8-8 8H0V0Z";
    const notePathHover = "M0 0h296v264l-16 16-16 16H0V0Z";

    const flapPathInitial =
        "M280 280a33 33 0 0 0 16 0l-16 16a33 33 0 0 0 0-16Z";
    const flapPathHover = "M264 264a66 66 0 0 0 32 0l-32 32a66 66 0 0 0 0-32Z";

    const flapGradientInitial = 280;
    const flapGradientHover = 264;

    const [spring, springApi] = useSpring(() => ({
        noteD: notePathInitial,
        flapD: flapPathInitial,
        flapGX: flapGradientInitial,
    }));

    const openFlap = () => {
        springApi.start({
            noteD: notePathHover,
            flapD: flapPathHover,
            flapGX: flapGradientHover,
        });
    };

    const closeFlap = () => {
        springApi.start({
            noteD: notePathInitial,
            flapD: flapPathInitial,
            flapGX: flapGradientInitial,
        });
    };

    return (
        <div
            className={
                "relative aspect-square w-[18.5em] overflow-visible px-8 pb-10 pt-6 " +
                styles["sticky-note"]
            }
            onMouseEnter={() => {
                console.log(true);
                openFlap();
            }}
            onMouseLeave={() => {
                console.log(false);
                closeFlap();
            }}
        >
            <div className="relative z-10 h-full w-full overflow-hidden font-marck-script">
                <h1 className="mb-1 truncate text-xl">{title}</h1>
                <h6 className="mb-4 text-xs text-black/60">{type}</h6>

                <p className="line-clamp-[7] text-base leading-snug">
                    {preview}
                </p>
            </div>

            <animated.svg
                width="296"
                height="296"
                viewBox="0 0 296 296"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 top-0 h-full w-full overflow-visible drop-shadow-sticky-note"
            >
                <animated.path
                    d={spring.noteD}
                    fill={colour?.data?.attributes?.hexCode}
                />
                <animated.path
                    d={spring.flapD}
                    fill={`url(#sticky_note_flap_gradient_${slug})`}
                />
                <animated.defs>
                    <animated.linearGradient
                        id={`sticky_note_flap_gradient_${slug}`}
                        x1={spring.flapGX}
                        y1={spring.flapGX}
                        x2="280"
                        y2="280"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor={darkestColor} />
                        <stop
                            offset="1"
                            stopColor={darkerColor}
                            stopOpacity=".5"
                        />
                    </animated.linearGradient>
                </animated.defs>
            </animated.svg>

            <Link
                href={`/poem/${slug}`}
                className="absolute left-0 top-0 z-30 h-full w-full"
            ></Link>
        </div>
    );
}
