import { Link } from "@inertiajs/react";
import { Bell, Heart, Home, Menu, User } from "lucide-react";

function Main({ children }) {
    return (
        <div className="font-sans   overflow-y-auto w-full max-w-[480px] mx-auto bg-gradient-to-br from-slate-50 to-blue-50 h-screen ">
            {children}
            {/* Enhanced Bottom Navigation */}
            <div className="fixed bottom-0  z-[1000000] left-1/2 transform -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl">
                <div className="flex justify-around items-center py-2 px-4">
                    <Link className="flex flex-col items-center py-2 transform hover:scale-110 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                    </Link>
                    <Link href={route('order.index')} className="flex flex-col items-center py-2 transform hover:scale-110 transition-all duration-300">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <Bell className="w-6 h-6 text-gray-400" />
                        </div>
                    </Link>
                    <Link className="flex flex-col items-center py-2 transform hover:scale-110 transition-all duration-300">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <Heart className="w-6 h-6 text-gray-400" />
                        </div>
                    </Link>
                    <Link className="flex flex-col items-center py-2 transform hover:scale-110 transition-all duration-300">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <User className="w-6 h-6 text-gray-400" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Main;
