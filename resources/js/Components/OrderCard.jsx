import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id"; // kalau mau pakai Bahasa Indonesia
import { formatRupiah} from "@/utils/method";
import { Banknote, Clock, MapPin } from "lucide-react";
import { Fragment, useState } from "react";


import {
    Dialog,
    Transition,
} from "@headlessui/react";
import TimelineOrder from "./TimelineOrder";
import { StatusColor } from "./StatusColor";
import { Link } from "@inertiajs/react";

function OrderCard({ order }) {
    const [isOpen, setIsopen] = useState(false);
    dayjs.extend(relativeTime);
    dayjs.locale("id"); // opsional: ganti 'en' jika ingin English

    

    return (
        <>
            <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow z-40">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-semibold text-base text-gray-900">
                            #{order.id}
                        </span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-600 text-sm">
                            {order.weight} {order.service.unit_satuan}
                        </span>
                    </div>
                    <div className="w-14  flex items-center justify-center">
                        <img
                            src={`/storage/${order.service.image}`}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </div>
                </div>

                {/* Service Type */}
                <div className="mb-3">
                    <span className="text-gray-800 text-sm font-medium">
                        • {order.service.name}
                    </span>
                </div>

                {/* Time and Price */}
                <div className="flex items-center gap-5 mb-3">
                    <div className="flex items-center gap-2 text-blue-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs text-gray-500">
                            {dayjs(order.created_at).fromNow()}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Banknote className="w-4 h-4" />
                        <span className="text-xs">
                            {" "}
                            {formatRupiah(order.total_price)}
                        </span>
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 mb-4">
                    <MapPin className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-[11px] truncate text-gray-400 leading-relaxed">
                        {order.address}
                    </span>
                    <Link href={route('order.show',order.reference)} className="text-blue-500 text-xs font-medium ml-auto whitespace-nowrap">
                        View Details
                    </Link>
                </div>

                {/* Status and Action */}
                <div className="flex bg-gray-100  border border-gray-200 shadow- rounded-full h-[2.5rem] items-center justify-between">
                    <div className="flex items-center gap-2">
                     <StatusColor status={order.status}/>
                    </div>
                    <button
                        onClick={() => setIsopen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors h-full shadow-md"
                    >
                        Check Status
                    </button>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsopen(false)}
                >
                    {/* Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    {/* Modal content */}
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl max-h-96 overflow-y-auto  transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-gray-700"
                                    >
                                        Status Pesanan
                                    </Dialog.Title>

                                    {/* timeline component dari react flowbite */}

                                    <TimelineOrder order={order}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default OrderCard;
