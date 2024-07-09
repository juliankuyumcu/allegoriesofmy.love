"use client";

import React from "react";

interface ScrollToTopProps {
    container?: HTMLElement | null;
    colour: string;
}

export default function ScrollToTop({ colour }: ScrollToTopProps) {
    return (
        <button
            className="fixed bottom-12 right-8 z-30 flex h-12 w-6 -translate-x-1/2 items-center justify-center p-1 text-white"
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 16 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 23C7 23.5523 7.44772 24 8 24C8.55228 24 9 23.5523 9 23L7 23ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928933 6.65685C0.538409 7.04738 0.538409 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 23L9 1L7 1L7 23L9 23Z"
                    fill={colour}
                />
            </svg>
        </button>
    );
}
