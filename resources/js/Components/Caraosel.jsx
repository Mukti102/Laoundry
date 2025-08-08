import { useEffect, useState } from "react";
import slider1 from "../../../public/assets/slider1.png";
import slider2 from "../../../public/assets/slider2.png";
import slider3 from "../../../public/assets/slider3.png";
export default function Caraosel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
        }, 4000);

        return () => {
            clearInterval(slideTimer);
        };
    }, []);
    const promoSlides = [
        {
            title: "Flat 50% off on First Order",
            subtitle: "New customer exclusive deal",
            image: slider1,
            bgGradient:
                "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500",
            accent: "text-blue-100",
        },
        {
            title: "Free Pickup & Delivery",
            subtitle: "Within 5km radius",
            image: slider2,
            bgGradient:
                "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600",
            accent: "text-emerald-100",
        },
        {
            title: "Same Day Service Available",
            subtitle: "Rush orders accepted",
            image: slider3,
            bgGradient:
                "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
            accent: "text-orange-100",
        },
    ];

    return (
        <div className="px-4 py-5">
            <div className="relative overflow-hidden rounded-3xl shadow-md">
                <div
                    className="flex  transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {promoSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`min-w-full ${slide.bgGradient} flex items-center justify-between relative overflow-hidden`}
                        >
                            {/* <div className="absolute inset-0 bg-black/10"></div>
                                <div className="flex-1 relative z-10">
                                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                                        <Star className="w-4 h-4 text-yellow-300 mr-1" />
                                        <span className="text-white text-xs font-medium">
                                            PREMIUM OFFER
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {slide.title}
                                    </h2>
                                    <p
                                        className={`${slide.accent} text-sm mb-4 opacity-90`}
                                    >
                                        {slide.subtitle}
                                    </p>
                                    <button className="hidden md:block bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/30 transition-all duration-300 flex items-center">
                                        Claim Offer
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div> */}

                            <img src={slide.image} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            {/* Enhanced Carousel Dots */}
            <div className="flex justify-center mt-2  space-x-3">
                {promoSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8"
                                : "bg-gray-300 w-2 hover:bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
