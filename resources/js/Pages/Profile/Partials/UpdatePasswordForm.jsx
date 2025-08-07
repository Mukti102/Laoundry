import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import {
    Lock,
    Key,
    Shield,
    CheckCircle,
    Eye,
    EyeOff,
    AlertTriangle,
} from "lucide-react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    // Password strength checker
    const getPasswordStrength = (password) => {
        if (password.length === 0) return { level: 0, text: "" };
        if (password.length < 6)
            return { level: 1, text: "Weak", color: "text-red-500" };
        if (password.length < 8)
            return { level: 2, text: "Fair", color: "text-yellow-500" };
        if (
            password.length >= 8 &&
            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
        ) {
            return { level: 4, text: "Strong", color: "text-green-500" };
        }
        return { level: 3, text: "Good", color: "text-blue-500" };
    };

    const passwordStrength = getPasswordStrength(data.password);

    return (
        <section
            className={`${className} bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden`}
        >
            {/* Header */}
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in-out duration-300"
                leaveTo="opacity-0 translate-x-4"
            >
                <div className="flex items-center my-5 gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">
                        Password updated successfully!
                    </span>
                </div>
            </Transition>
            <div
                className={`bg-gradient-to-br from-red-500 to-orange-600 px-6 py-8 transform transition-all duration-800 delay-200 ${
                    isLoaded
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-8 opacity-0"
                }`}
            >
                <div className="text-center">
                    {/* Security Icon */}

                    {/* Header Text */}
                    <div
                        className={`transform transition-all duration-700 delay-400 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <h2 className="text-xl font-bold text-white mb-2">
                            Update Password
                        </h2>
                        <p className="text-white/80 text-sm">
                            Keep your account secure with a strong password
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div
                className={`px-6 py-8 transform transition-all duration-800 delay-600 ${
                    isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                }`}
            >
                <form onSubmit={updatePassword} className="space-y-6">
                    {/* Current Password */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-700 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="current_password"
                            value="Current Password"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Key className="w-4 h-4 text-gray-500" />
                            Current Password
                        </InputLabel>
                        <div className="relative">
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                autoComplete="current-password"
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword(!showCurrentPassword)
                                }
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <InputError
                            message={errors.current_password}
                            className="text-xs"
                        />
                    </div>

                    {/* New Password */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="password"
                            value="New Password"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Lock className="w-4 h-4 text-gray-500" />
                            New Password
                        </InputLabel>
                        <div className="relative">
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type={showNewPassword ? "text" : "password"}
                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                autoComplete="new-password"
                                placeholder="Create a strong new password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {data.password && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        Password Strength:
                                    </span>
                                    <span
                                        className={`text-xs font-medium ${passwordStrength.color}`}
                                    >
                                        {passwordStrength.text}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            passwordStrength.level === 1
                                                ? "bg-red-500 w-1/4"
                                                : passwordStrength.level === 2
                                                  ? "bg-yellow-500 w-2/4"
                                                  : passwordStrength.level === 3
                                                    ? "bg-blue-500 w-3/4"
                                                    : passwordStrength.level ===
                                                        4
                                                      ? "bg-green-500 w-full"
                                                      : "w-0"
                                        }`}
                                    />
                                </div>
                            </div>
                        )}

                        <InputError
                            message={errors.password}
                            className="text-xs"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-800 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Lock className="w-4 h-4 text-gray-500" />
                            Confirm Password
                        </InputLabel>
                        <div className="relative">
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                autoComplete="new-password"
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Password Match Indicator */}
                        {data.password_confirmation && (
                            <div className="flex items-center gap-2">
                                {data.password ===
                                data.password_confirmation ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-green-600">
                                            Passwords match
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                        <span className="text-xs text-red-600">
                                            Passwords don't match
                                        </span>
                                    </>
                                )}
                            </div>
                        )}

                        <InputError
                            message={errors.password_confirmation}
                            className="text-xs"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div
                        className={`flex items-center justify-between pt-4 transform transition-all duration-600 delay-850 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <PrimaryButton
                            disabled={processing}
                            className="px-8 py-3 bg-gradient-to-br from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Updating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Update Password
                                </div>
                            )}
                        </PrimaryButton>

                        {/* Success Message */}
                    </div>

                    {/* Security Tips */}
                    <div
                        className={`pt-4 border-t border-gray-100 transform transition-all duration-600 delay-900 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <div className="bg-orange-50/50 rounded-xl p-4">
                            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-orange-500" />
                                Password Security Tips
                            </h4>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li>
                                    • Use at least 8 characters with mixed case
                                    letters
                                </li>
                                <li>
                                    • Include numbers and special characters
                                </li>
                                <li>• Avoid using personal information</li>
                                <li>
                                    • Don't reuse passwords from other accounts
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
