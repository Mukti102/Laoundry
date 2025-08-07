import Main from "@/Layouts/Main";
import { formatRupiah } from "@/utils/method";
import { route } from "ziggy-js";
import logo from '../../../public/assets/logo.png'
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
    PlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Card } from "@/Components/Card";
import { Header } from "@/Components/Header";
import SmalCard from "@/Components/SmalCard";

export default function Beranda({ services }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // loading state

    useEffect(() => {
        // Simulasi loading selama 1 detik
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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

    

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center">
                    {/* <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div> */}
                    <img src={logo} className="animate-bounce mt-0 w-28" alt="" />
                    {/* <p className="text-sm text-gray-500">Loading...</p> */}
                </div>
            </div>
        );
    }

    return (
        <Main>
           <Header/>

            {/* Enhanced Promotional Banner */}
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
                                    <button className="hidden md:block bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/30 transition-all duration-300 flex items-center">
                                        Claim Offer
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                                {/* <div className="w-32 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ml-6 shadow-xl">
                                    <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                </div> */}

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
                        Layanan Kami
                    </h3>
                    <Link href={route('service.index')} className="text-primary font-medium text-sm flex items-center">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="flex overflow-x-auto gap-4 scrollbar-hide px-1">
                    {services
                        .filter((item) => item.unit_satuan == "kg")
                        .map((service, index) => (
                          <SmalCard service={service}/>
                        ))}
                    {services
                        .filter((item) => item.unit_satuan == "kg")
                        .map((service, index) => (
                          <SmalCard service={service}/>
                        ))}
                </div>
            </div>

            {/* Enhanced Active Orders */}
            <div className="px-4 mb-10">
                <div className="space-y-0 mb-3">
                    <h3 className="text-base font-bold text-gray-900">
                        Mau Order Apa Hari Ini ?
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                        Pilih Salah Satu
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {services
                        .filter((item) => item.unit_satuan !== "kg")
                        .map((service) => (
                            <Card key={service.id} service={service} />
                        ))}
                </div>
            </div>

            {/* <div className="px-4 mb-32">
                <div className="space-y-0 mb-3">
                    <h3 className="text-base font-bold text-gray-900">
                        ORDERAN
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                        Berdasrkan Orderan Kita
                    </p>
                </div>
                <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Tidak Ada Orderan Yg Aktif
                    </h4>
                    <p className="text-gray-400 text-sm mb-6">
                        Start your first laundry order today
                    </p>
                </div>
            </div> */}
        </Main>
    );
}
