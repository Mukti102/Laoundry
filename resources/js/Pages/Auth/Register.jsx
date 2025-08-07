import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Auth } from '@/Layouts/Auth';
import GuestLayout from '@/Layouts/GuestLayout';
import Main from "@/Layouts/Main";
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from "react";
import logo from '../../../../public/assets/logo.png'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Auth>
            <Head title="Register" />

            <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex flex-col overflow-hidden">
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
                        }`}>Create Account</h1>
                        <p className={`text-white/80 text-sm transform transition-all duration-700 delay-500 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>Join us today and start your journey</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className={`bg-white rounded-t-3xl px-6 pt-8 pb-8 shadow-2xl transform transition-all duration-800 delay-600 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}>
                    <form onSubmit={submit} className="space-y-5">
                        {/* Name Field */}
                        <div className={`space-y-2 transform transition-all duration-600 delay-700 ${
                            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                        }`}>
                            <InputLabel 
                                htmlFor="name" 
                                value="Full Name" 
                                className="text-gray-700 font-medium text-sm"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Enter your full name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="text-xs" />
                        </div>

                        {/* Email Field */}
                        <div className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
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
                                placeholder="Enter your email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="text-xs" />
                        </div>

                        {/* Password Field */}
                        <div className={`space-y-2 transform transition-all duration-600 delay-800 ${
                            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
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
                                autoComplete="new-password"
                                placeholder="Create a strong password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="text-xs" />
                        </div>

                        {/* Confirm Password Field */}
                        <div className={`space-y-2 transform transition-all duration-600 delay-850 ${
                            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                        }`}>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="text-gray-700 font-medium text-sm"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="text-xs"
                            />
                        </div>

                        {/* Terms & Privacy Notice */}
                        <div className={`text-center py-2 transform transition-all duration-600 delay-900 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                By creating an account, you agree to our{" "}
                                <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                        {/* Register Button */}
                        <PrimaryButton 
                            className={`w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg transition-all duration-600 delay-950 disabled:opacity-70 disabled:cursor-not-allowed transform ${
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
                                    Creating Account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </PrimaryButton>

                        {/* Divider & Login Link */}
                        <div className={`pt-4 transform transition-all duration-600 delay-1000 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">or</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link 
                                        href={route('login')} 
                                        className="text-primary font-medium hover:text-primary/80 transition-colors"
                                    >
                                        Sign in
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