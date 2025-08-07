import { LogOut, MapPin, User } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Avatar, buttonTheme, Dropdown } from "flowbite-react";
import DangerButton from "./DangerButton";
import logo from '../../../public/assets/logo.png'

export function Header() {
    const { auth } = usePage().props;
    const user = auth?.user;
    console.log(auth);

    return (
        <div className="bg-white/50 z-[1000000000000] backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between p-3">
                <div className="space-y-0">
                    <img src={logo} width={50} alt="" />
                    {/* <h1 className="text-xl font-bold text-primary">
                        Klins
                    </h1>
                    <div className="flex items-center mt-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>Surabaya, East Java</span>
                    </div> */}
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        // Jika user sudah login, tampilkan tombol logout
                        <button onClick={() => router.post("logout")}>
                            <LogOut className="text-red-600" />
                        </button>
                    ) : (
                        // Jika belum login, tampilkan link ke halaman login
                        <Link href={route("login")} className="shadow-md rounded-full border border-1 border-gray-700">
                            <Avatar rounded   />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
