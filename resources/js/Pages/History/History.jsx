import React from "react";
import Main from "@/Layouts/Main";
import OrderCard from "@/Components/OrderCard";
import { CheckCircle, Search, Filter, Calendar, Package, X } from "lucide-react";
import TextInput from "@/Components/TextInput";
import Dropdown from "@/Components/Dropdown";

export default function History({ orders }) {
    const [activeTab, setActiveTab] = React.useState("active");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedStatus, setSelectedStatus] = React.useState("");
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const status = [
        { value: "", label: "All Status" },
        { value: "menunggu", label: "Menunggu" },
        { value: "dikonfirmasi", label: "Dikonfirmasi" },
        { value: "dijemput", label: "Dijemput" },
        { value: "diterima", label: "Diterima" },
        { value: "diproses", label: "Diproses" },
        { value: "selesai", label: "Selesai" },
        { value: "diambil", label: "Diambil" },
    ];

    // Filter orders based on tab, search, and status
    const getFilteredOrders = () => {
        let filtered = orders;

        // Filter by tab
        if (activeTab === "complete") {
            filtered = filtered.filter(order => order.status === "selesai" || order.status === "diambil");
        } else {
            filtered = filtered.filter(order => order.status !== "selesai" && order.status !== "diambil");
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(order => {
                const searchLower = searchQuery.toLowerCase();
                return (
                    order.id?.toString().includes(searchLower) ||
                    order.customer_name?.toLowerCase().includes(searchLower) ||
                    order.service_name?.toLowerCase().includes(searchLower) ||
                    order.status?.toLowerCase().includes(searchLower) ||
                    order.notes?.toLowerCase().includes(searchLower)
                );
            });
        }

        // Filter by status
        if (selectedStatus) {
            filtered = filtered.filter(order => order.status === selectedStatus);
        }

        return filtered;
    };

    const filteredOrders = getFilteredOrders();
    const activeOrdersCount = orders.filter(order => order.status !== "selesai" && order.status !== "diambil").length;
    const completedOrdersCount = orders.filter(order => order.status === "selesai" || order.status === "diambil").length;

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedStatus("");
    };

    const hasActiveFilters = searchQuery.trim() || selectedStatus;

    return (
        <Main>
            <div className="bg-gradient-to-br z-10 from-slate-50 via-blue-50/30 to-purple-50/20">
                {/* Header */}
                <div className={`px-6 pt-16 pb-6  duration-800 delay-200 ${
                    isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                }`}>
                    <div className="flex items-center justify-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            My Orders
                        </h1>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl p-1 border border-gray-200/50">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                activeTab === "active"
                                    ? "bg-primary text-white shadow-lg"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                            }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Active
                            {activeOrdersCount > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    activeTab === "active" 
                                        ? "bg-white/20 text-white" 
                                        : "bg-blue-100 text-blue-600"
                                }`}>
                                    {activeOrdersCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("complete")}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                activeTab === "complete"
                                    ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                            }`}
                        >
                            <CheckCircle className="w-4 h-4" />
                            Complete
                            {completedOrdersCount > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    activeTab === "complete" 
                                        ? "bg-white/20 text-white" 
                                        : "bg-green-100 text-green-600"
                                }`}>
                                    {completedOrdersCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className={`px-6 mb-6 z-50  duration-700 delay-400 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    <div className="flex items-center justify-end gap-3 mb-4">
                        {/* Search Input */}
                        {/* <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="search"
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-5 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                                autoComplete="off"
                                placeholder="Search by ID, name, service..."
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div> */}

                        {/* Filter Dropdown */}
                        <div className="relative z-50">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className={`inline-flex items-center gap-2 px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                                            selectedStatus 
                                                ? 'text-blue-600 border-blue-200 bg-blue-50/80' 
                                                : 'text-gray-600 hover:text-gray-700'
                                        }`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span className="text-xs">
                                            {selectedStatus ? status.find(s => s.value === selectedStatus)?.label : 'Filter'}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content className="w-48 z-[9999] relative bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden">
                                    {status.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedStatus(item.value)}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors capitalize border-b border-gray-100 last:border-b-0 ${
                                                selectedStatus === item.value 
                                                    ? 'bg-blue-50 text-blue-600 font-medium' 
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Active Filters & Results */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                    Clear Filters
                                </button>
                            )}
                            <div className="text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-lg">
                                {filteredOrders.length} orders found
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className={`px-6 pb-32   z-0 duration-800 delay-600`}>
                    {filteredOrders.length > 0 ? (
                        <div className="space-y-4">
                            {filteredOrders.map((order, index) => (
                                <div
                                    key={`${order.id}-${index}`}
                                    className={` duration-500 `}
                                    style={{ transitionDelay: `${700 + (index * 100)}ms` }}
                                >
                                    <OrderCard order={order} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                {hasActiveFilters ? (
                                    <Search className="w-8 h-8 text-gray-400" />
                                ) : activeTab === "complete" ? (
                                    <CheckCircle className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <Package className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {hasActiveFilters 
                                    ? 'No orders match your filters'
                                    : activeTab === "complete"
                                        ? 'No completed orders yet'
                                        : 'No active orders'
                                }
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">
                                {hasActiveFilters 
                                    ? 'Try adjusting your search or filter criteria'
                                    : activeTab === "complete"
                                        ? 'Completed orders will appear here'
                                        : 'Your active orders will appear here'
                                }
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
}