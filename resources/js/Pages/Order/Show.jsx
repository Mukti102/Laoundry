import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock, MapPin, CreditCard, Star, X } from "lucide-react";
import Detail from "@/Layouts/Detail";
import { Button } from "@headlessui/react";
import { percentageStatus } from "@/utils/method";
import { Link, router } from "@inertiajs/react";
import { toast } from "react-toastify";

function Show({ order }) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [hoveredStar, setHoveredStar] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (order.review) {
            setIsConfirmed(true);
        }
    }, []);

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

    const handleConfirmation = () => {
        setIsConfirmed(true);
        setShowConfirmationModal(false);
        setShowReviewModal(true);
    };

    const handleReviewSubmit = async () => {
        setLoading(true);
        // Di sini Anda bisa mengirim data review ke API
        const reviewData = {
            order_id: order.id,
            rating: rating,
            review: reviewText,
        };

        // Simulasi API call
        router.post(`/review/${order.id}`, reviewData, {
            onFinish: (e) => {
                setLoading(false);
            },
            onError: (e) => {
                toast.error(e[0]);
                setLoading(false);
            },
            onSuccess: (page) => {
                toast.success("Ulasan Berhasil Di Simpan");
            },
        });
        // await submitReview(reviewData);

        setShowReviewModal(false);
        // Bisa redirect atau update state
    };

    const buttonFoot = {
        text: "Back To Home",
        onclick: () => (window.location.href = "/"),
    };

    // Check if status is "diambil" (delivered/picked up)
    const isDelivered = order.status.toLowerCase() === "diantar";

    return (
        <Detail buttonFoot={buttonFoot}>
            {/* Progress Card */}
            <div className="m-4 p-6 flex flex-col items-center">
                <CircularProgress
                    percentage={percentageStatus(order.status)}
                    label={order.status}
                />

                <Button className="w-max bg-blue-500 text-white py-3 px-6 rounded-xl font-medium text-sm">
                    {order.service.name}
                </Button>

                {/* Confirmation Button - Show only if delivered and not confirmed yet */}
                {isDelivered && !isConfirmed && (
                    <Button
                        onClick={() => setShowConfirmationModal(true)}
                        className="w-max bg-green-500 text-white py-3 px-6 rounded-xl font-medium text-sm mt-3 hover:bg-green-600 transition-colors"
                    >
                        Konfirmasi Penerimaan
                    </Button>
                )}

                {/* Thank you message after confirmation */}
                {isConfirmed && (
                    <div className="mt-3 text-center">
                        <p className="text-green-600 font-medium text-sm">
                            ✓ Terima kasih atas konfirmasinya!
                        </p>
                    </div>
                )}
            </div>

            {/* Order Information */}
            <div className="p-6 space-y-6 bg-white rounded-xl">
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
                                    {order.transaction?.payment_method ? (
                                        <p className="text-xs uppercase font-medium text-gray-800">
                                            {order.transaction?.payment_method}
                                        </p>
                                    ) : (
                                        <Link
                                            href={`/detail-order/${order.reference}`}
                                            className="text-[11px] text-blue-600 underline"
                                        >
                                            Belum Bayar
                                        </Link>
                                    )}
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
                                        {order.address}
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 mb-1">
                                        Alamat Pengiriman
                                    </p>
                                    <p className="text-[10px] text-gray-600">
                                        {order.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Konfirmasi Penerimaan
                            </h3>
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6 text-sm">
                            Apakah Anda sudah menerima pesanan laundry Anda
                            dengan baik?
                        </p>

                        <div className="flex space-x-3">
                            <Button
                                onClick={() => setShowConfirmationModal(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleConfirmation}
                                className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                                Ya, Sudah Diterima
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Berikan Ulasan
                            </h3>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-3 text-sm">
                                Bagaimana pengalaman Anda dengan layanan kami?
                            </p>

                            {/* Rating Stars */}
                            <div className="flex justify-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() =>
                                            setHoveredStar(star)
                                        }
                                        onMouseLeave={() => setHoveredStar(0)}
                                        className="p-1"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${
                                                star <= (hoveredStar || rating)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Review Text */}
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Tulis ulasan Anda di sini..."
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex space-x-3">
                            <Button
                                onClick={() => setShowReviewModal(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                                Lewati
                            </Button>
                            <Button
                                onClick={handleReviewSubmit}
                                disabled={rating === 0}
                                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                            >
                                {loading
                                    ? "Sedang Di Kirim..."
                                    : "Kirim Ulasan"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Detail>
    );
}

export default Show;
