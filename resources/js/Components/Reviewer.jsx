import React, { useEffect, useState } from "react";
import { Star, Filter, ChevronDown } from "lucide-react";
import axios from "axios";
import ReviewerSkeleton from "./ReviewerSkeleton";

export default function Reviewer({ services }) {
    const [selectedService, setSelectedService] = useState("all");
    const [showFilter, setShowFilter] = useState(false);
    const [reviewer, setReviewer] = useState([]);
    const [loading, setLoading] = useState(false);

    const getReviewer = async () => {
        setLoading(true);
        const res = await axios.get(`/get-reviewer/${selectedService}`);
        const data = res?.data;
        setReviewer(data);
        setLoading(false);
    };

    useEffect(() => {
        getReviewer();
    }, [selectedService]);

    useEffect(() => {
        setSelectedService(services[0].id);
    }, []);

    const filteredReviews =
        selectedService === "all"
            ? reviewer
            : reviewer.filter(
                  (review) => review.service.id === selectedService,
              );

    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${
                            star <= rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    const getAverageRating = () => {
        if (filteredReviews.length === 0) return 0;
        const total = filteredReviews.reduce(
            (sum, review) => sum + review.rating,
            0,
        );
        return (total / filteredReviews.length).toFixed(1);
    };

    return (
        <div className="px-4 mb-32">
            {/* Header Stats */}
            <div className="rounded-3xl p-6 border border-gray-100 mb-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                        Ulasan Pelanggan
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                        {filteredReviews.length} ulasan • Rating rata-rata{" "}
                        {getAverageRating()}
                    </p>
                    <div className="flex items-center justify-center">
                        {renderStars(Math.round(getAverageRating()))}
                        <span className="ml-2 text-lg font-semibold text-gray-800">
                            {getAverageRating()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <div className="relative">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                        <div className="flex items-center">
                            <Filter className="w-4 h-4 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">
                                {selectedService == "all"
                                    ? "Semua"
                                    : services.find(
                                          (s) => s.id === selectedService,
                                      )?.name}
                            </span>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-gray-600 transition-transform ${showFilter ? "rotate-180" : ""}`}
                        />
                    </button>

                    {showFilter && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            {services.map((service) => (
                                <button
                                    key={service.value}
                                    onClick={() => {
                                        setSelectedService(service.id);
                                        setShowFilter(false);
                                    }}
                                    className={`w-full text-left p-3 hover:bg-gray-50 ${
                                        selectedService === service.id
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700"
                                    } ${service.id === services[0].id ? "rounded-t-xl" : ""} ${
                                        service.id ===
                                        services[services.length - 1].id
                                            ? "rounded-b-xl"
                                            : ""
                                    }`}
                                >
                                    <span className="text-sm font-medium">
                                        {service.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews List */}
            {loading ? (
                <ReviewerSkeleton />
            ) : (
                <div className="space-y-4">
                    {filteredReviews.length === 0 ? (
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-3xl p-10 text-center shadow-sm border border-slate-200 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-28 h-28 bg-slate-100 rounded-full -translate-y-14 translate-x-14 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-18 h-18 bg-gray-100 rounded-full translate-y-9 -translate-x-9 opacity-30"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-100 to-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <div className="w-8 h-8 bg-slate-400 rounded opacity-60"></div>
                                </div>

                                <h4 className="text-sm font-bold text-gray-800 mb-3 tracking-tight">
                                    Tidak Ada Ulasan Saat Ini
                                </h4>
                                <p className="text-gray-500 text-xs mb-6 leading-relaxed max-w-xs mx-auto">
                                    Belum ada informasi yang tersedia saat ini
                                </p>

                                <div className="inline-flex items-center text-[10px] text-slate-600 font-medium bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                                    Periksa kembali nanti
                                </div>
                            </div>
                        </div>
                    ) : (
                        filteredReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                            >
                                {/* User Info */}
                                <div className="flex items-start mb-3">
                                    <div className="w-10 h-10 bg-blue-500 overflow-hidden rounded-full flex items-center justify-center mr-3">
                                        {review.user.avatar_url ? (
                                            <img
                                                src={`storage/${review.user.avatar_url}`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={`https://i.pinimg.com/736x/fb/6c/1f/fb6c1f3561169051c01cfb74d73d93b7.jpg`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h5 className="font-semibold text-gray-900 text-sm">
                                                {review.user.name}
                                            </h5>
                                            <span className="text-xs text-gray-500">
                                                {/* {new Date(review.date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })} */}
                                                {review.created_at}
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                                                {review.service.name}
                                            </span>
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <div className="pl-13">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {review.review}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
