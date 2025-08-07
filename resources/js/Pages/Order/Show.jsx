import React from "react";
import { ArrowLeft, Clock, MapPin, CreditCard } from "lucide-react";
import Detail from "@/Layouts/Detail";
import { Button } from "@headlessui/react";
import { percentageStatus } from "@/utils/method";

function Show({ order }) {
    const CircularProgress = ({ percentage, label }) => {
        const circumference = 2 * Math.PI * 45;
        const strokeDashoffset =
            circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-40 h-40 mx-auto mb-8">
                <svg
                    className="w-40 h-40 transform -rotate-90"
                    viewBox="0 0 100 100"
                >
                    <defs>
                        <filter
                            id="innerShadow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                        >
                            <feOffset dx="0" dy="1" />
                            <feGaussianBlur
                                stdDeviation="2"
                                result="offset-blur"
                            />
                            <feComposite
                                in="SourceGraphic"
                                in2="offset-blur"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                                result="inner-shadow"
                            />
                            <feComposite
                                in="SourceGraphic"
                                in2="inner-shadow"
                                operator="over"
                            />
                        </filter>
                    </defs>

                    {/* Background Circle with inner shadow */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#f1f5f9"
                        strokeWidth="8"
                        fill="none"
                        filter="url(#innerShadow)"
                    />

                    {/* Progress Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                {/* Label and percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                        {percentage}%
                    </span>
                    <span className="text-sm capitalize text-gray-600">
                        {label}
                    </span>
                </div>
            </div>
        );
    };

    const buttonFoot = {
        text: "Back To Home",
        onclick: () => (window.location.href = "/"),
    };

    return (
        <Detail buttonFoot={buttonFoot}>
            {/* Progress Card */}
            <div className="m-4 p-6 flex flex-col items-center">
                <CircularProgress
                    percentage={percentageStatus(order.status)}
                    label={order.status}
                />

                <Button className="w-max bg-blue-500 text-white py-3 px-6 rounded-xl font-medium  text-sm">
                    {order.service.name}
                </Button>
            </div>

            {/* Order Information */}
            <div className="p-6 space-y-6 bg-white rounded-xl ">
                {/* Header */}
                <div className="pb-2 space-y-1 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-800">
                        Order Details
                    </h2>
                    <p className="text-xs text-gray-500">
                        Order Id #{order.id}
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column */}
                    <div className="space-y-5">
                        {/* Timeline */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                Timeline
                            </h3>
                            <div className="flex items-start space-x-3">
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="w-px h-12 bg-gray-200 mt-1"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-800">
                                            Pickup
                                        </p>
                                        <p className="text-[11px] text-gray-600">
                                            {order.pickup_time} |{" "}
                                            {order.pickup_date}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-800">
                                            Delivery
                                        </p>
                                        <p className="text-[11px] text-gray-600">
                                            {order.deliver_time} |{" "}
                                            {order.deliver_date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div>
                            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                                Payment
                            </h3>
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <svg
                                        className="w-5 h-5 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-medium text-gray-800">
                                        {order.transaction?.payment_method ?? 'Belum Bayar' }
                                    </p>
                                    <p className="text-[11px] text-gray-500">
                                        Payment upon receipt
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-5">
                        {/* Addresses */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                Alamat
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 mb-1">
                                        Alamat Penjemputan
                                    </p>
                                    <p className="text-[10px] text-gray-600">
                                        A-105, building no. 4, Kanpur Nagar,
                                        Uttar Pradesh
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 mb-1">
                                        Alamat Pengiriman
                                    </p>
                                    <p className="text-[10px] text-gray-600">
                                        A-105, building no. 4, Kanpur Nagar,
                                        Uttar Pradesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Detail>
    );
}

export default Show;
