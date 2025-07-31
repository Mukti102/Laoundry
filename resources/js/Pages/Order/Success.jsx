import { useState, useEffect } from "react";
import { Check, User, ArrowLeft, Download, Share2 } from "lucide-react";
import { router } from "@inertiajs/react";

function Success({
    transaction = {
        orderNumber: "#8989",
        date: new Date().toLocaleDateString("id-ID"),
        paymentMethod: "Transfer",
        discount: 0,
        subtotal: 10000,
        total: 110000,
        amount: 100000,
    },
}) {
    const [isAnimated, setIsAnimated] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsAnimated(true), 100);
        setTimeout(() => setShowDetails(true), 600);
    }, []);

    const handleClick = () => {
        router.get('/');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        })
            .format(amount)
            .replace("IDR", "Rp.");
    };

    const date = new Date(transaction.created_at);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")} ${date.toLocaleString("id-ID", { month: "long" })} ${date.getFullYear()} ${"|"}   ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    return (
        <div className=" bg-gradient-to-br from-blue-50 h-screen bg-red-300 via-white to-green-50 flex items-center  justify-center ">
            <div className="w-full h-screen max-w-[480px] overflow-y-auto ">
                {/* Success Card */}
                <div className="bg-white overflow-hidden">
                    {/* Success Icon Section */}
                    <div className="pt-5 pb-8 px-8  text-center bg-gradient-to-b from-green-50 to-white">
                        <div
                            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl transform transition-all duration-700 ${isAnimated ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
                        >
                            <Check
                                className="w-12 h-12 text-white"
                                strokeWidth={3}
                            />
                        </div>

                        <div
                            className={`transform transition-all duration-500 delay-300 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
                                Payment Success
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Congratulations! Your order has been placed.
                                <br />
                                You can track your order number{" "}
                                <span className="font-semibold text-blue-600">
                                    {transaction.orderNumber}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Transaction Details */}
                    <div
                        className={`px-8 pb-8  transform transition-all duration-500 delay-500 ${showDetails ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    >
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">
                                    Tanggal
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {formattedDate}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">
                                    Metode Pembayaran
                                </span>
                                <span className="font-semibold uppercase text-gray-800">
                                    {transaction?.payment_method}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">
                                    Discount
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {0}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-gray-600 font-medium">
                                    Subtotal
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {formatCurrency(transaction.total)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-4 bg-gray-50 rounded-xl mt-4">
                                <span className="text-base font-bold text-gray-800">
                                    Total
                                </span>
                                <span className="text-lg font-bold text-green-600">
                                    {formatCurrency(transaction.total)}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 space-y-3 ">
                            <button
                                onClick={handleClick}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
                            >
                                Back To Home
                            </button>

                            {/* <div className="flex gap-3">
                                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Receipt
                                </button>
                                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 flex items-center justify-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div> */}
                            {/* Bottom Info */}
                            <div className="text-center mt-6 ">
                                <p className="text-sm text-gray-500">
                                    Need help?{" "}
                                    <button className="text-blue-500 font-medium hover:underline">
                                        Contact Support
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
