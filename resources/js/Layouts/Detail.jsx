import { cn } from "@/utils/method";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Children, useState } from "react";
import { route } from "ziggy-js";

function Detail({
    children,
    title,
    buttonFoot,
    routeName = "home",
    routeParams = {},
    className
}) {
    return (
        <div
            className={cn(
                "font-sans w-full h-screen max-w-[480px] mx-auto flex flex-col",
                className,
            )}
        >
            {/* Header */}

            {/* Content with Scroll */}
            <main className="flex-1   overflow-y-auto px-0 pb-20">
            {title && (
                <header className="bg-transparent top-0 w-full z-40">
                    <div className="flex items-center gap-4 px-4 py-4">
                        <Link
                            href={route(routeName, routeParams)}
                            className=" transition-colors p-1"
                        >
                            <ArrowLeft size={24} />
                        </Link>

                        <h1 className="text-lg font-semibold">
                            {title}
                        </h1>
                    </div>
                </header>
            )}
                {children}
            </main>

            {/* Fixed Bottom Checkout */}
            <div className="fixed z-[100000] w-full max-w-md bottom-0 left-0 right-0 mx-auto p-4 bg-gray-50 shadow-lg">
                <button
                    onClick={buttonFoot.onclick}
                    className="w-full block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-center text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl transform"
                >
                    {buttonFoot.text}
                </button>
            </div>
        </div>
    );
}

export default Detail;
