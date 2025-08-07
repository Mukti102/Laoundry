import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { route } from "ziggy-js";


export function Card({ service }) {
    return (
        <div className="h-44 p-3 bg-primary rounded-lg  space-y-1 text-white relative">
            <h1 className="text-sm font-semibold">{service.name}</h1>
            <p className="text-[9px] text-gray-100">{service.description}</p>
            {/* image */}
            <img
                src={`storage/${service.image}`}
                className="absolute object-cover w-20 bottom-3"
                alt=""
            />
            <Link
                href={route("service.show", service.slug)}
                className="absolute right-3 shadow-sm bottom-3 bg-white w-10 h-10 text-gray-900 rounded-full flex justify-center items-center"
            >
                <PlusIcon width={20} />
            </Link>
        </div>
    );
}
