"use client";

import React from "react";
import styles from "@/styles/StickyNote.module.css";

export default function StickyNotePlaceholder() {
    return (
        <div
            className={
                "relative aspect-square w-[18.5em] overflow-hidden bg-gray-500/30 " +
                styles["sticky-note-placeholder"]
            }
        >
            <div
                className={
                    "absolute h-16 w-[200%] bg-white/20 " +
                    styles["sticky-note-placeholder-shine"]
                }
            ></div>
        </div>
    );
}
