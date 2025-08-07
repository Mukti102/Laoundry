import SmallCard from "@/Components/SmalCard";
import TextInput from "@/Components/TextInput";
import Main from "@/Layouts/Main";
import { useState, useEffect } from "react";
import { Search, Filter, Grid3X3, List, Sparkles } from "lucide-react";

export default function Services({ services }) {
    const [input, setInput] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const filteredServices = input
        ? services.filter((item) =>
              item.name?.toLowerCase().includes(input.toLowerCase()),
          )
        : services;

    return (
        <Main>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
                {/* Header Section */}
                <div
                    className={`px-6 pt-16 pb-6 transform transition-all duration-800 delay-200 ${
                        isLoaded
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-8 opacity-0"
                    }`}
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-2xl shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                        Our Services
                    </h1>
                    <p className="text-gray-500 text-center text-sm">
                        Choose from our premium laundry services
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div
                    className={`px-6 mb-6 transform transition-all duration-700 delay-400 ${
                        isLoaded
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                    }`}
                >
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <TextInput
                            id="search"
                            type="text"
                            name="search"
                            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                            autoComplete="off"
                            placeholder="Search services..."
                            value={input}
                            onChange={handleChange}
                        />

                        {/* Clear Search Button */}
                        {input && (
                            <button
                                onClick={() => setInput("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <div className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                                    <span className="text-xs">×</span>
                                </div>
                            </button>
                        )}
                    </div>

                    {/* Filter & View Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    Filter
                                </span>
                            </button>

                            <div className="text-sm text-gray-500 bg-white/60 px-3 py-2 rounded-lg">
                                {filteredServices.length} services
                            </div>
                        </div>

                        <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-all duration-300 ${
                                    viewMode === "grid"
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-all duration-300 ${
                                    viewMode === "list"
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div
                    className={`px-6 pb-8 transform transition-all duration-800 delay-600 ${
                        isLoaded
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    {filteredServices.length > 0 ? (
                        <div
                            className={`${
                                viewMode === "grid"
                                    ? "grid grid-cols-3 gap-3"
                                    : "grid grid-cols-2 gap-4"
                            } transition-all duration-500`}
                        >
                            {filteredServices.map((service, index) => (
                                <SmallCard service={service} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                No services found
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Try adjusting your search terms
                            </p>
                            <button
                                onClick={() => setInput("")}
                                className="px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Popular Services Suggestion */}
                {input === "" && (
                    <div
                        className={`px-6 pb-8 transform transition-all duration-800 delay-800 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100/50">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                                <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                                Quick Access
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {["Wash & Iron", "Steam", "Laundry"].map(
                                    (tag, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(tag)}
                                            className="px-3 py-1 bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-lg hover:bg-white transition-all duration-300 border border-gray-200/50"
                                        >
                                            {tag}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Main>
    );
}
