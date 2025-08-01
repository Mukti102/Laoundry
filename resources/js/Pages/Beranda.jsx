import Main from "@/Layouts/Main";
import { formatRupiah } from "@/utils/method";
import {route} from 'ziggy-js';
import {
    ChevronRight,
    Plus,
    Home,
    Bell,
    Heart,
    Menu,
    Shirt,
    Clock,
    Sparkles,
    MapPin,
    User,
    Star,
    Zap,
    Droplets,
    Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Beranda({services}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
        }, 4000);

        return () => {
            clearInterval(timer);
            clearInterval(slideTimer);
        };
    }, []);

    const promoSlides = [
        {
            title: "Flat 50% off on First Order",
            subtitle: "New customer exclusive deal",
            image: "/api/placeholder/300/150",
            bgGradient:
                "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500",
            accent: "text-blue-100",
        },
        {
            title: "Free Pickup & Delivery",
            subtitle: "Within 5km radius",
            image: "/api/placeholder/300/150",
            bgGradient:
                "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600",
            accent: "text-emerald-100",
        },
        {
            title: "Same Day Service Available",
            subtitle: "Rush orders accepted",
            image: "/api/placeholder/300/150",
            bgGradient:
                "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
            accent: "text-orange-100",
        },
    ];

   

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Main>
            <div className="bg-white/80  backdrop-blur-xl shadow-sm">
                <div className="flex items-center justify-between p-6 pt-3">
                    <div className="space-y-0">
                        <h1 className="text-2xl font-bold text-primary">
                            QuickWash
                        </h1>
                        <div className="flex items-center mt-1 text-gray-500 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>Surabaya, East Java</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                                {formatTime(currentTime)}
                            </div>
                            <div className="text-xs text-gray-500">
                                Live Time
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Promotional Banner */}
            <div className="px-4 py-5">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {promoSlides.map((slide, index) => (
                            <div
                                key={index}
                                className={`min-w-full ${slide.bgGradient} p-8 flex items-center justify-between relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-black/10"></div>
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
                                    <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/30 transition-all duration-300 flex items-center">
                                        Claim Offer
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                                <div className="w-32 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ml-6 shadow-xl">
                                    <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
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

            {/* Enhanced Services Section */}
            <div className="px-4 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-800">
                        LAYANAN KAMI
                    </h3>
                    <button className="text-primary font-medium text-sm flex items-center">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {services.map((service, index) => (
                        <Link href={route('service.show',service.slug)}
                            key={index}
                            className={` rounded-2xl p-6 bg-white shadow-md border border-gray-300 text-center hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex w-12  mx-auto overflow-hidden  justify-center text-primary  items-center mb-2">
                                <img className="w-full h-full object-cover" src={`/storage/${service.image}`} alt="" />
                            </div>
                            <h4 className="font-semibold text-gray-900 text-xs mb-1.5">
                                {service.name}
                            </h4>
                            <p className={`text-[10px] font-semibold text-primary`}>
                                {formatRupiah(service.price_per_kg)}/Kg
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Enhanced Active Orders */}
            <div className="px-4 mb-32">
                <div className="space-y-0 mb-3">
                    <h3 className="text-base font-bold text-gray-900">
                        ORDERAN
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">Berdasrkan Orderan Kita</p>
                </div>
                <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-gray-100">
                   
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Tidak Ada Orderan Yg Aktif
                    </h4>
                    <p className="text-gray-400 text-sm mb-6">
                        Start your first laundry order today
                    </p>
                    
                </div>
            </div>
        </Main>
    );
}
