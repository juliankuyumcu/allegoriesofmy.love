import type { Metadata } from "next";
import { Marck_Script, Markazi_Text } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const marckScript = Marck_Script({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-marck-script",
});

const markaziText = Markazi_Text({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-markazi-text",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${marckScript.variable} ${markaziText.variable} h-full w-full bg-pink`}
        >
	    <head>
	    	<title>allegoriesofmy.love</title>
		<meta name="author" content="Julian K." />
		<meta name="description" content="An archive of poems, short stories, and art that aim for truth and humanity..." />
	    </head>
            <body className="h-full w-full">{children}</body>
        </html>
    );
}
