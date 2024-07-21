export const getPageSize = () => {
    if (typeof window === "undefined") return 1;

    // in accordance with TailwindCSS breakpoints & beyond
    if (window.innerWidth < 640) return 3;
    if (window.innerWidth < 1024) return 6;
    if (window.innerWidth < 1280) return 8;
    if (window.innerWidth < 1536) return 8;
    if (window.innerWidth <= 2560) return 15;
    return 30;
};
