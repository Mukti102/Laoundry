import React from "react";
import Main from "@/Layouts/Main";
import OrderCard from "@/Components/OrderCard";
import { CheckCircle } from "lucide-react";

export default function History({ orders }) {
    const [activeTab, setActiveTab] = React.useState("active");
    return (
        <Main>
            <div className="max-w-md mx-auto  min-h-screen">
                {/* Header */}
                <div className=" px-6 py-6 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <h1 className="text-lg font-bold text-gray-700">
                            My Order
                        </h1>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex bg-white shadow-sm rounded-xl">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={`flex-1 py-3  px-4 rounded-lg text-sm font-medium transition-all ${
                                activeTab === "active"
                                    ? "bg-blue-500 text-white shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setActiveTab("complete")}
                            className={`flex-1  py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                                activeTab === "complete"
                                    ? "bg-green-500 text-white shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Complete
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-3 pb-32 py-0">
                    {activeTab === "active" && (
                        <div>
                            {orders.map((order, index) => (
                                <OrderCard
                                    key={`${order.id}-${index}`}
                                    order={order}
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "complete" && (
                        <div>
                            {orders
                                .filter((item) => item.status == "selesai")
                                .map((order, index) => (
                                    <OrderCard
                                        key={`${order.id}-${index}`}
                                        order={order}
                                    />
                                ))}
                            {orders
                                .filter((item) => item.status == "selesai").length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500">
                                        No completed orders yet
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
}
