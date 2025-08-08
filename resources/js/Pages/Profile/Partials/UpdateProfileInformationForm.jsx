import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    User,
    Mail,
    Camera,
    CheckCircle,
    AlertCircle,
    Edit,
    Edit2Icon,
    Edit2,
} from "lucide-react";
import axios from "axios";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const { data, setData, patch,post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            avatar: "",
            email: user.email,
            provinsi: user.provinsi || "",
            kota: user.kota || "",
            kecamatan: user.kecamatan || "",
            address: user.address || "",
        });

    const submit = (e) => {
        e.preventDefault();


        post(route("profile.update"), {
            _method: "patch", // biar tetap ke method PATCH di Laravel
            preserveScroll: true,
        });
    };

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(
        user.provinsi || "",
    );
    const [selectedRegency, setSelectedRegency] = useState(user.kota || "");
    const [selectedDistrict, setSelectedDistrict] = useState(
        user.kecamatan || "",
    );

    useEffect(() => {
        // Fetch Provinsi
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                setProvinces(data);
            })
            .catch((err) => {
                console.log("error", err);
            });
    }, []);

    useEffect(() => {
        const fetchRegencies = async () => {
            if (selectedProvince) {
                try {
                    const res = await fetch(
                        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
                    );
                    if (!res.ok) {
                        throw new Error("Failed to fetch regencies");
                    }
                    const data = await res.json();
                    setRegencies(data);
                } catch (error) {
                    console.error("Error fetching regencies:", error);
                }
            } else {
                setRegencies([]);
            }

            // Reset regency dan district jika province berubah
            if (selectedProvince !== user.provinsi) {
                setSelectedRegency("");
                setDistricts([]);
                setSelectedDistrict("");
                // Update form data
                setData((prevData) => ({
                    ...prevData,
                    kota: "",
                    kecamatan: "",
                }));
            }
        };

        fetchRegencies();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedRegency) {
                try {
                    const res = await fetch(
                        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`,
                    );
                    if (!res.ok) {
                        throw new Error("Failed to fetch districts");
                    }
                    const data = await res.json();
                    setDistricts(data);
                } catch (error) {
                    console.error("Error fetching districts:", error);
                }
            } else {
                setDistricts([]);
            }

            // Reset district jika regency berubah
            if (selectedRegency !== user.kota) {
                setSelectedDistrict("");
                // Update form data
                setData((prevData) => ({
                    ...prevData,
                    kecamatan: "",
                }));
            }
        };

        fetchDistricts();
    }, [selectedRegency]);

    // Handler untuk update province
    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);

        // Update form data dengan nama provinsi
        const selectedProvinceData = provinces.find(
            (prov) => prov.id === provinceId,
        );
        setData((prevData) => ({
            ...prevData,
            provinsi: selectedProvinceData ? selectedProvinceData.name : "",
        }));
    };

    // Handler untuk update regency
    const handleRegencyChange = (e) => {
        const regencyId = e.target.value;
        setSelectedRegency(regencyId);

        // Update form data dengan nama regency
        const selectedRegencyData = regencies.find(
            (reg) => reg.id === regencyId,
        );
        setData((prevData) => ({
            ...prevData,
            kota: selectedRegencyData ? selectedRegencyData.name : "",
        }));
    };

    // Handler untuk update district
    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);

        // Update form data dengan nama district
        const selectedDistrictData = districts.find(
            (dis) => dis.id === districtId,
        );
        setData((prevData) => ({
            ...prevData,
            kecamatan: selectedDistrictData ? selectedDistrictData.name : "",
        }));
    };

    return (
        <section
            className={`${className} bg-white shadow-xl border border-gray-100 overflow-hidden`}
        >
            {/* Header with Avatar */}
            <div
                className={`bg-primary px-6 py-8 transform transition-all duration-800 delay-200 ${
                    isLoaded
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-8 opacity-0"
                }`}
            >
                {/* success message */}
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0 translate-x-4"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0 translate-x-4"
                >
                    <div className="flex items-center z-50 absolute top-2 right-2 gap-2 my-3 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">
                            Profile updated successfully!
                        </span>
                    </div>
                </Transition>
                <div className="text-center">
                    {/* Avatar Container */}
                    <div
                        className={`relative mx-auto mb-4 transform transition-all duration-700 delay-300 ${
                            isLoaded
                                ? "scale-100 opacity-100"
                                : "scale-75 opacity-0"
                        }`}
                    >
                        <div className="w-24 h-24 relative mx-auto rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white">
                            <img
                                src={user.avatar_url ? `storage/${user.avatar_url}` : 'https://i.pinimg.com/736x/0f/68/94/0f6894e539589a50809e45833c8bb6c4.jpg'}
                                className="w-full h-full object-cover"
                                alt="Profile"
                            />
                        </div>
                    </div>

                    {/* Header Text */}
                    <div
                        className={`transform transition-all duration-700 delay-400 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <h2 className="text-xl font-bold text-white mb-2">
                            Profile Information
                        </h2>
                        <p className="text-white/80 text-sm">
                            Update your account's profile information and email
                            address
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
                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                    className="space-y-6"
                >
                    {/* Name Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-700 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="name"
                            value="Full Name"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <User className="w-4 h-4 text-gray-500" />
                            Full Name
                        </InputLabel>
                        <TextInput
                            id="name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                            placeholder="Enter your full name"
                        />
                        <InputError className="text-xs" message={errors.name} />
                    </div>

                    {/* Email Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="email"
                            value="Email Address"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-gray-500" />
                            Email Address
                        </InputLabel>
                        <TextInput
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Enter your email address"
                        />
                        <InputError
                            className="text-xs"
                            message={errors.email}
                        />
                    </div>

                    {/* Province Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="provinsi"
                            value="Provinsi"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-gray-500" />
                            Provinsi
                        </InputLabel>
                        <select
                            id="provinsi"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                        >
                            <option value="">-- Pilih Provinsi --</option>
                            {provinces.map((prov) => (
                                <option key={prov.id} value={prov.id}>
                                    {prov.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            className="text-xs"
                            message={errors.provinsi}
                        />
                    </div>

                    {/* Regency Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="kota"
                            value="Kabupaten/Kota"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-gray-500" />
                            Kabupaten/Kota
                        </InputLabel>
                        <select
                            id="kota"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            value={selectedRegency}
                            onChange={handleRegencyChange}
                            disabled={!selectedProvince}
                        >
                            <option value="">-- Pilih Kabupaten/Kota --</option>
                            {regencies.map((reg) => (
                                <option key={reg.id} value={reg.id}>
                                    {reg.name}
                                </option>
                            ))}
                        </select>
                        <InputError className="text-xs" message={errors.kota} />
                    </div>

                    {/* District Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="kecamatan"
                            value="Kecamatan"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-gray-500" />
                            Kecamatan
                        </InputLabel>
                        <select
                            id="kecamatan"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            disabled={!selectedRegency}
                        >
                            <option value="">-- Pilih Kecamatan --</option>
                            {districts.map((dis) => (
                                <option key={dis.id} value={dis.id}>
                                    {dis.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            className="text-xs"
                            message={errors.kecamatan}
                        />
                    </div>

                    {/* Address Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="address"
                            value="Alamat Lengkap"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-gray-500" />
                            Alamat
                        </InputLabel>
                        <textarea
                            id="address"
                            placeholder="Jl.Rajawali No 45 , Silo , Surabaya , Jawa Timur , Depan Masjid Jami'"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                        ></textarea>
                        <InputError
                            className="text-xs"
                            message={errors.address}
                        />
                    </div>

                    {/* Avatar Field */}
                    <div
                        className={`space-y-2 transform transition-all duration-600 delay-750 ${
                            isLoaded
                                ? "translate-x-0 opacity-100"
                                : "translate-x-8 opacity-0"
                        }`}
                    >
                        <InputLabel
                            htmlFor="avatar"
                            value="Photo Profile"
                            className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4 text-gray-500" />
                            Photo Profile
                        </InputLabel>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            onChange={(e) =>
                                setData("avatar", e.target.files[0])
                            }
                        />
                        <InputError
                            className="text-xs"
                            message={errors.avatar}
                        />
                    </div>

                    {/* Email Verification Notice */}
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div
                            className={`bg-amber-50 border border-amber-200 rounded-xl p-4 transform transition-all duration-600 delay-800 ${
                                isLoaded
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-4 opacity-0"
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-amber-800 mb-2">
                                        Your email address is unverified.
                                    </p>
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="inline-flex items-center px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-medium rounded-lg transition-colors"
                                    >
                                        Send Verification Email
                                    </Link>
                                </div>
                            </div>

                            {status === "verification-link-sent" && (
                                <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-green-700">
                                        Verification link sent to your email.
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

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
                            className="px-8 py-3 bg-primary hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Save Changes
                                </div>
                            )}
                        </PrimaryButton>
                    </div>

                    {/* Additional Info */}
                    <div
                        className={`pt-4 border-t border-gray-100 transform transition-all duration-600 delay-900 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                        }`}
                    >
                        <div className="bg-blue-50/50 rounded-xl p-4">
                            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-blue-500" />
                                Profile Security
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Your profile information is encrypted and
                                secure. Changes to your email address may
                                require verification.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
