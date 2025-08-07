import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import Main from "@/Layouts/Main";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import logo from '../../../../public/assets/logo.png'
import { Auth } from "@/Layouts/Auth";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Auth>
            <Head title="Log in" />
            <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex flex-col overflow-hidden">
                {/* Status Message */}
                {status && (
                    <div className={`mx-4 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg transform transition-all duration-700 ${
                        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                    }`}>
                        <div className="text-sm font-medium text-green-600">
                            {status}
                        </div>
                    </div>
                )}

                {/* Header Section */}
                <div className="flex-1 flex flex-col justify-center px-6 pt-8 pb-4">
                    <div className={`text-center mb-8 transform transition-all duration-800 delay-200 ${
                        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                    }`}>
                        <div className={`inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6 transform transition-all duration-700 delay-300 ${
                            isLoaded ? 'scale-100 rotate-0 opacity-100' : 'scale-75 rotate-12 opacity-0'
                        }`}>
                            <img src={logo} className="w-12 h-12 object-contain" alt="Logo" />
                        </div>
                        <h1 className={`text-2xl font-bold text-white mb-2 transform transition-all duration-700 delay-400 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>Welcome Back</h1>
                        <p className={`text-white/80 text-sm transform transition-all duration-700 delay-500 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>Sign in to your account to continue</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className={`bg-white rounded-t-3xl px-6 pt-8 pb-8 shadow-2xl transform transition-all duration-800 delay-600 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}>
                    <form onSubmit={submit} className="space-y-5 pb-20">
                        {/* Email Field */}
                        <div className={`space-y-2 transform transition-all duration-600 delay-700 ${
                            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                        }`}>
                            <InputLabel 
                                htmlFor="email" 
                                value="Email" 
                                className="text-gray-700 font-medium text-sm"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="Enter your email"
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            <InputError message={errors.email} className="text-xs" />
                        </div>

                        {/* Password Field */}
                        <div className={`space-y-2 transform transition-all duration-600 delay-800 ${
                            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                        }`}>
                            <InputLabel 
                                htmlFor="password" 
                                value="Password" 
                                className="text-gray-700 font-medium text-sm"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <InputError message={errors.password} className="text-xs" />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className={`flex items-center justify-between transform transition-all duration-600 delay-900 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                                    onChange={(e) => setData("remember", e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            {/* {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )} */}
                        </div>

                        {/* Login Button */}
                        <PrimaryButton 
                            className={`w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg transition-all duration-600 delay-1000 disabled:opacity-70 disabled:cursor-not-allowed transform ${
                                isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                            }`}
                            disabled={processing}
                        >
                            {processing ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </PrimaryButton>

                        {/* Divider & Additional Links */}
                        <div className={`   transform transition-all duration-600 delay-1100 `}>
                            
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link 
                                        href={route("register")} 
                                        className="text-primary font-medium hover:text-primary/80 transition-colors"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Auth>
    );
}