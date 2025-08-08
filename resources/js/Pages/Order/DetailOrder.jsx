import Detail from "@/Layouts/Detail";
import { formatRupiah } from "@/utils/method";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { CreditCard, Receipt } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

function DetailOrder({ order, snapToken, clientKey,isProduction }) {
    useEffect(() => {
        // Load Midtrans Snap.js when component mounts
        const script = document.createElement("script");
        script.src = isProduction ? "https://app.midtrans.com/snap/snap.js"  : "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", clientKey); // pakai .env
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleClick = () => {
        if (window.snap && snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    // update status pembayaran
                    // Kirim request ke backend untuk update status
                    axios
                        .put(`/update-paid-status/${order.id}`, {
                            payment_type: result.payment_type,
                            payment_method: result.va_numbers[0],
                            total: result.gross_amount,
                            status: result.transaction_status,
                        })
                        .then((response) => {
                          
                            // Redirect ke halaman sukses
                            toast.success("payment successfull");
                            router.get(`/success/${response.data.data.id}`);
                        })
                        .catch((error) => {
                            console.error(
                                "Gagal update status pembayaran:",
                                error,
                            );
                        });

                    // redirect ke halaman sukses atau refresh
                },
                onPending: function (result) {
                    console.log("Payment pending:", result);
                },
                onError: function (result) {
                    console.error("Payment error:", result);
                },
                onClose: function () {
                    console.log("Payment popup closed");
                },
            });
        } else {
            alert("Midtrans not loaded properly");
        }
    };

    const buttonFoot = {
        text: "Bayar Sekarang",
        onclick: handleClick,
    };

    return (
        <Detail
            routeName="service.show"
            routeParams={{ slug: order.service.slug }}
            title="Detail Pesanan"
            buttonFoot={buttonFoot}
        >
            {/* Content */}
            <div className="max-w-md mx-auto px-4 py-1 space-y-4">
                {/* Order Status */}
                <div className="bg-white  rounded-xl shadow-sm border p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Receipt className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm space-y-0.5">
                            <h2 className="font-medium text-gray-900">
                                Order #{order.reference}
                            </h2>
                            <p className="text-xs text-gray-500">
                                Status: {order.status}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-2 h-2 ${order.is_paid == 1 ? "bg-green-400" : "bg-orange-400"}  rounded-full animate-pulse`}
                        ></div>
                        {order.is_paid == 0 ? (
                            <span className="text-sm text-orange-600 font-medium">
                                Pending Payment
                            </span>
                        ) : (
                            <span className="text-sm text-green-600 font-medium">
                                Success Payment
                            </span>
                        )}
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold text-base capitalize text-gray-700">
                            Item Pesanan
                        </h3>
                    </div>
                    <div className="p-4 space-y-3">
                        <div
                            key="1"
                            className="flex justify-between items-center"
                        >
                            <div className="flex-1">
                                <p className="text-sm text-gray-500">
                                    {order.weight} {order.service.unit_satuan}
                                </p>
                            </div>
                            <p className="font-semibold text-sm text-gray-600">
                                {formatRupiah(order.total_price)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* pesan */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold text-base capitalize text-gray-700">
                            Catatan
                        </h3>
                    </div>
                    <div className="p-4 space-y-3">
                        <div
                            key="1"
                            className="text-xs text-gray-700"
                        >
                            {order.notes}
                        </div>
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 border-b">
                        <h3 className="font-medium text-base text-gray-700">
                            Rincian Pembayaran
                        </h3>
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold text-gray-900">
                                {formatRupiah(order.total_price)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Diskon</span>
                            <span className="font-medium text-green-600">
                                0
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Biaya Ongkir</span>
                            <span className="font-medium text-gray-900">0</span>
                        </div>

                        <div className="border-t pt-3">
                            <div className="flex text-base justify-between items-center">
                                <span className=" font-semibold text-gray-900">
                                    Total
                                </span>
                                <span className=" font-bold text-primary">
                                    {formatRupiah(order.total_price)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method Info */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                    <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                            <h4 className="font-medium text-blue-900 mb-1">
                                Metode Pembayaran
                            </h4>
                            <p className="text-sm text-blue-700">
                                Pilih metode pembayaran yang tersedia setelah
                                klik tombol bayar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Detail>
    );
}

export default DetailOrder;
