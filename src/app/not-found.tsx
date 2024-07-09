import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative h-screen w-full font-marck-script">
            <div className="relative left-1/2 top-1/3 w-max -translate-x-1/2">
                <h1 className="mb-4 text-center text-2xl">
                    No Place In My Heart...
                </h1>
                <Link href="/">
                    <h2 className="text-center text-xl text-rose-900 underline decoration-1 hover:text-rose-950">
                        Return Home
                    </h2>
                </Link>
            </div>
        </div>
    );
}
