import { cn } from "@/utils/method";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function SmallCard({ service,className }) {
    return (
        <>
            <Link
                href={route("service.show", service.slug)}
                key={service.id}
                className={cn("group relative  flex-shrink-0 rounded-xl p-4 bg-white shadow-sm border border-gray-100 text-center hover:shadow-xs transition-all duration-200 cursor-pointer hover:border-primary-50 hover:bg-primary-50 overflow-hidden",className)}
            >
                {/* Image with subtle shine effect on hover */}
                <div className="flex w-14 h-14 mx-auto mb-2 overflow-hidden rounded-lg bg-gray-50 justify-center items-center p-1.5 group-hover:bg-white transition-all duration-300 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.15]"
                        src={`/storage/${service.image}`}
                        alt={service.image}
                        loading="lazy"
                    />
                </div>

                {/* Service name with better truncation */}
                <h4 className="font-medium text-gray-800 text-[12px] mb-2 line-clamp-2 px-1 leading-tight">
                    {service.name}
                </h4>

                {/* Floating action button for mobile */}
                <div className="absolute bottom-2 right-2 sm:hidden">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary-600 rounded-full shadow-sm transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Desktop view details (hidden on mobile) */}
            </Link>
        </>
    );
}
