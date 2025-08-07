import { Link, usePage } from "@inertiajs/react";
import { Bell, Heart, Home, User, ShoppingBag } from "lucide-react";
import { route } from "ziggy-js";

function Main({ children }) {
    const currentRoute = route().current();

    const isActive = (name) => currentRoute === name;

    const navigationItems = [
        {
            name: 'home',
            route: 'home',
            icon: Home,
            label: 'Home'
        },
        {
            name: 'service.index',
            route: 'service.index',
            icon: ShoppingBag,
            label: 'Service'
        },
      
        {
            name: 'order.index',
            route: 'order.index',
            icon: Bell,
            label: 'Alerts'
        },
        {
            name: 'profile.edit',
            route: 'profile.edit',
            icon: User,
            label: 'Profile'
        }
    ];

    return (
        <div className="font-sans overflow-y-auto w-full max-w-[480px] mx-auto bg-gray-50 min-h-screen">
            {/* Main Content */}
            <div className="pb-24">
                {children}
            </div>
            
            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] z-50">
                {/* Navigation Container */}
                <div className="mx-4 mb-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/20">
                    <div className="flex justify-around items-center px-2 py-2">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            const active = isActive(item.name);
                            
                            return (
                                <Link 
                                    key={item.name}
                                    href={route(item.route)}
                                    className="flex flex-col items-center py-2 px-3 relative group"
                                >
                                    
                                    {/* Icon Container */}
                                    <div className={`relative w-10 h-10  rounded-xl flex items-center justify-center transition-all duration-300  ${
                                        active
                                            ? 'bg-primary shadow-lg scale-110'
                                            : 'bg-gray-100/80 group-hover:bg-gray-200/80 group-hover:scale-105'
                                    }`}>
                                        <IconComponent 
                                            className={`w-5 h-5 transition-colors duration-300 ${
                                                active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                                            }`} 
                                        />
                                        
                                        {/* Active Dot Indicator */}
                                        {active && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white shadow-sm animate-bounce" />
                                        )}
                                    </div>
                                    
                                    {/* Label */}
                                    
                                    {/* Active Underline */}
                                    {active && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                
                {/* Safe Area Bottom Padding */}
                <div className="h-2 bg-transparent" />
            </div>
        </div>
    );
}

export default Main;