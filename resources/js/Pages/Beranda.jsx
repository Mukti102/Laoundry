import Main from "@/Layouts/Main";
import { formatRupiah } from "@/utils/method";
import { route } from "ziggy-js";
import logo from "../../../public/assets/logo.png";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Card } from "@/Components/Card";
import { Header } from "@/Components/Header";
import SmalCard from "@/Components/SmalCard";
import Caraosel from "@/Components/Caraosel";
import Reviewer from "@/Components/Reviewer";

export default function Beranda({ services }) {
    const [isLoading, setIsLoading] = useState(true); // loading state

    useEffect(() => {
        // Simulasi loading selama 1 detik
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

 

    

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center">
                    {/* <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div> */}
                    <img
                        src={logo}
                        className="animate-bounce mt-0 w-28"
                        alt=""
                    />
                    {/* <p className="text-sm text-gray-500">Loading...</p> */}
                </div>
            </div>
        );
    }

    return (
        <Main>
            <Header />

           <Caraosel/>

            {/* Enhanced Services Section */}
            <div className="px-4 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-800">
                        Layanan Kami
                    </h3>
                    <Link
                        href={route("service.index")}
                        className="text-primary font-medium text-sm flex items-center"
                    >
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="flex overflow-x-auto gap-4 scrollbar-hide px-1">
                    {services
                        .filter((item) => item.unit_satuan == "kg")
                        .map((service, index) => (
                            <SmalCard service={service} />
                        ))}
                </div>
            </div>

            {/* Enhanced Active Orders */}
            <div className="px-4 mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">
                        Mau Order Apa Hari Ini ?
                    </h3>
                    <Link
                        href={route("service.index")}
                        className="text-primary font-medium text-sm flex items-center"
                    >
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {services
                        .filter((item) => item.unit_satuan !== "kg")
                        .slice(0, 4)
                        .map((service) => (
                            <Card key={service.id} service={service} />
                        ))}
                </div>
            </div>

           <Reviewer services={services} />
        </Main>
    );
}
