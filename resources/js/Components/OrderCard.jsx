import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id"; // kalau mau pakai Bahasa Indonesia
import { formatRupiah } from "@/utils/method";
import { Banknote, Clock, MapPin } from "lucide-react";


function OrderCard({ order }) {
    dayjs.extend(relativeTime);
    dayjs.locale("id"); // opsional: ganti 'en' jika ingin English

    const statusColor =
        order.status === "selesai"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-600";

    return (
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-base text-gray-900">
                        #{order.id}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600 text-sm">
                        {order.weight}Kg
                    </span>
                </div>
                <div className="w-10 h-10  rounded-full flex items-center justify-center">
                    <img src={`/storage/${order.service.image}`} className="w-full h-full object-cover" alt="" />
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
                <span className="text-[11px] text-gray-400 leading-relaxed">
                    {order.address}
                </span>
                <button className="text-blue-500 text-xs font-medium ml-auto whitespace-nowrap">
                    View Details
                </button>
            </div>

            {/* Status and Action */}
            <div className="flex bg-gray-100  border border-gray-200 shadow- rounded-full h-[2.5rem] items-center justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className={`px-3 py-1 rounded-full mx-4 text-xs font-semibold text-gray-500 capitalize ${statusColor} shadow-sm`}
                    >
                        {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                    </span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors h-full shadow-md">
                    Check Status
                </button>
            </div>
        </div>
    );
}

export default OrderCard;