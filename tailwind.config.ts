import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "marck-script": ["var(--font-marck-script)"],
                "markazi-text": ["var(--font-markazi-text)"],
            },
            backgroundImage: {
                "gradient-radial":
                    "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 95%)",
                "gradient-left":
                    "linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
            },
            colors: {
                pink: "#FFCCCC",
                orange: "#FFC6A6",
            },
            dropShadow: {
                "sticky-note": "4px 6px 6px rgba(0, 0, 0, 0.25)",
            },
        },
    },
    plugins: [],
};
export default config;
