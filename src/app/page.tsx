import qs from "qs";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import StickyNoteGrid from "@/components/StickyNoteGrid";
import { strapiFetch } from "@/util/fetch";
import { WritingType } from "@/util/types";
import { init } from "next/dist/compiled/webpack/webpack";

export default async function Home() {
    return (
        <div className="flex h-full w-full flex-col items-center">
            <Navbar />

            <StickyNoteGrid />
            <span className="min-h-32 w-full bg-transparent"></span>
            <div className="fixed bottom-0 z-20 h-32 w-full bg-gradient-to-t from-pink from-40%"></div>

            <ScrollToTop colour={"black"} />
        </div>
    );
}
