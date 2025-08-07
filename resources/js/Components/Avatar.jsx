// resources/js/Components/DropdownMenu.jsx
import { router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { route } from "ziggy-js";

export default function Avatar({ user }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    const handleLogout = () => {
        router.post('logout');
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="rounded-full overflow-hidden border-2 border-white w-10 h-10"
            >
                <img
                    src={user?.profile ?? '/default-avatar.png'}
                    alt="avatar"
                    className="w-full h-full object-cover"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                   

                    {user ? (
                        <a
                            onClick={handleLogout}
                            method="post"
                            as="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </a>
                    ) : (
                        <a
                            href={route("login")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Login
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
