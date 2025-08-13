import { LogOut, MapPin } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import logo from "../../../public/assets/logo.png";

export function Header() {
    const { auth, app } = usePage().props;
    const user = auth?.user;
    const siteLogo = app.logo;

    const [locationName, setLocationName] = useState("Memuat lokasi...");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Reverse geocoding pakai API publik
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                        );
                        const data = await res.json();
                        if (data.address) {
                            const city =
                                data.address.county || data.address.city || "";
                            const kecamatan =
                                data.address.town ||
                                data.address.village ||
                                data.address.suburb ||
                                "";
                            const state = data.address.state || "";

                            // Join hanya bagian yang ada (biar nggak ada koma dobel)
                            const locationParts = [
                                city,
                                kecamatan,
                                state,
                            ].filter(Boolean);
                            setLocationName(locationParts.join(", "));
                        } else {
                            setLocationName("Lokasi tidak ditemukan");
                        }
                    } catch (err) {
                        setLocationName("Gagal memuat lokasi");
                    }
                },
                () => {
                    setLocationName("Izin lokasi ditolak");
                },
            );
        } else {
            setLocationName("Geolocation tidak didukung");
        }
    }, []);

    return (
        <div className="bg-white/50 z-[1000000000000] backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between p-3">
                <div className="space-y-0 gap-1 flex items-center">
                    <img
                        src={!siteLogo ? logo : `storage/${siteLogo}`}
                        width={50}
                        alt=""
                    />
                    <div>
                        <h1 className="text-base font-bold text-primary">
                            {app.site_name}
                        </h1>
                        <div className="flex items-center text-gray-500 text-[11px]">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{locationName}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <button onClick={() => router.post("logout")}>
                            <LogOut className="text-red-600" />
                        </button>
                    ) : (
                        <Link
                            href={route("login")}
                            className="shadow-md rounded-full border border-1 border-gray-700"
                        >
                            <Avatar rounded />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
