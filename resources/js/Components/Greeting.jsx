import { Link, usePage } from "@inertiajs/react";

export default function Greeting() {
    const {auth} = usePage().props
    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 4 && hour < 10) {
        greeting = "Selamat Pagi";
    } else if (hour >= 10 && hour < 15) {
        greeting = "Selamat Siang";
    } else if (hour >= 15 && hour < 18) {
        greeting = "Selamat Sore";
    } else {
        greeting = "Selamat Malam";
    }

    return (
        <div className="px-4 mb-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">
                    {greeting} {auth?.user?.name}
                </h3>
            </div>
            <div className="grid grid-cols-1">
                <Link href={route('service.index')} className="px-3 text-center py-3 text-white bg-primary rounded-xl font-semibold">
                    Schedule Pickup
                </Link>
            </div>
        </div>
    );
}
