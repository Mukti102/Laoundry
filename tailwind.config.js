import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            colors:{
                "primary" : "#2563EB",
                "lightBlue" : '#EFF6FF',
                'bg-medium-blue' : '#DBEAFE',
                'gray-light' : '#F3F4F6',
                'textBlack' : '#1F2937',
                'starYellow' : '#FBBF24',
                'white' : '#FFFFFF',
                'shadow-color' : 'rgba(0, 0, 0, 0.05)',
            }
        },
    },

    plugins: [forms],
};
