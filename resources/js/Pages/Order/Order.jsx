import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Detail from "@/Layouts/Detail";
import { formatRupiah } from "@/utils/method";
import { Dialog, Transition } from "@headlessui/react";
import { Edit, Minus, Plus, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import useStore from "@/store/appStore";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

function Order({ service }) {
    const [weight, setWeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        title: "Panti, Jember, Jawa Timur",
        detail: "Jl. Rajawali No 45 Kemuningsari Lor 02 Panti, Jember, Jawa Timur",
    });

    const { setOrderData, order } = useStore();

    const increase = () =>
        setWeight((prev) => {
            const newWeight = prev + 1;
            setOrderData({ weight: newWeight });
            return newWeight;
        });

    const decrease = () => {
        setWeight((prev) => {
            const newWeight = prev > 0 ? prev - 1 : 0;
            setOrderData({ weight: newWeight });
            return newWeight;
        });
    };

    useEffect(() => {
        setOrderData({ serviceId: service.id });
    }, [service]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const {
            weight,
            address,
            pickupDate,
            pickupTime,
            deliveryDate,
            deliveryTime,
            serviceId,
        } = order;

        if (!weight || weight <= 0) {
            toast.error("Pastikan kamu sudah input berat cucian!");
            setLoading(false);
            return;
        }

        if (!address.title || !address.detail) {
            toast.error("Pastikan alamat sudah lengkap!");
            setLoading(false);

            return;
        }

        if (!pickupDate || !pickupTime) {
            toast.error("Tanggal & waktu penjemputan harus diisi!");
            setLoading(false);
            return;
        }

        if (!deliveryDate || !deliveryTime) {
            toast.error("Tanggal & waktu pengantaran harus diisi!");
            setLoading(false);
            return;
        }

        if (!serviceId) {
            toast.error("Silakan pilih jenis layanan!");
            setLoading(false);

            return;
        }
        // Jika lolos semua validasi
        router.post("/order", order, {
            onFinish: () => {
                setLoading(false);
            },
            onError: () => {
                toast.error("error");
                setLoading(false);
            },
            onSuccess: (page) => {
                console.log(`Isi page:`, page);
                toast.success("Berhasil");
            },
        });
    };

    const buttonFoot = {
        text: loading ? "Loading ..." : "Checkout",
        onclick: handleSubmit,
    };

    return (
        <>
            <Detail title={`Layanan ${service.name}`} buttonFoot={buttonFoot}>
                <main className="p-4">
                    <section className="space-y-6">
                        {/* Input Berat */}
                        <div className="space-y-2">
                            <h2 className="font-semibold text-gray-800 text-base">
                                Masukkan Berat Kilo
                            </h2>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-primary">
                                    {`${formatRupiah(service?.price_per_kg * weight)}`}
                                </span>
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={decrease}
                                        className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white"
                                    >
                                        <Minus width={16} height={16} />
                                    </button>
                                    <span className="text-sm font-medium text-gray-700">
                                        {weight} Kg
                                    </span>
                                    <button
                                        onClick={increase}
                                        className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white"
                                    >
                                        <Plus width={16} height={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Penjemputan & Pengantaran */}
                        <div className="space-y-5">
                            <h2 className="font-semibold text-gray-800 text-base">
                                Penjemputan & Pengantaran
                            </h2>
                            <div className="flex justify-between items-start bg-gray-100 border border-gray-200 shadow-sm rounded-md p-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700">
                                        {address.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {address.detail}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="text-primary"
                                >
                                    <Edit width={18} height={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2.5">
                                    <InputLabel value="Tanggal Penjemputan" />
                                    <TextInput
                                        onChange={(e) =>
                                            setOrderData({
                                                pickupDate: e.target.value,
                                            })
                                        }
                                        type="date"
                                        className="w-full text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel value="Waktu Penjemputan" />
                                    <TextInput
                                        onChange={(e) =>
                                            setOrderData({
                                                pickupTime: e.target.value,
                                            })
                                        }
                                        type="time"
                                        className="w-full text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel value="Tanggal Pengiriman" />
                                    <TextInput
                                        onChange={(e) =>
                                            setOrderData({
                                                deliveryDate: e.target.value,
                                            })
                                        }
                                        type="date"
                                        className="w-full text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel value="Waktu Pengiriman" />
                                    <TextInput
                                        onChange={(e) =>
                                            setOrderData({
                                                deliveryTime: e.target.value,
                                            })
                                        }
                                        type="time"
                                        className="w-full text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <InputLabel value="Catatan" />
                                <textarea
                                    rows={3}
                                    onChange={(e) =>
                                        setOrderData({ notes: e.target.value })
                                    }
                                    placeholder="Instruksi tambahan..."
                                    className="w-full text-sm rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </Detail>

            {/* Modal Edit Alamat */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium text-gray-900"
                                        >
                                            Edit Alamat Penjemputan
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <InputLabel value="Label Lokasi" />
                                            <TextInput
                                                value={address.title}
                                                onChange={(e) =>
                                                    setAddress((prev) => {
                                                        const updated = {
                                                            ...prev,
                                                            title: e.target
                                                                .value,
                                                        };
                                                        setOrderData({
                                                            address: updated,
                                                        });
                                                        return updated;
                                                    })
                                                }
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <InputLabel value="Detail Alamat" />
                                            <textarea
                                                rows={3}
                                                value={address.detail}
                                                onChange={(e) =>
                                                    setAddress((prev) => {
                                                        const updated = {
                                                            ...prev,
                                                            detail: e.target
                                                                .value,
                                                        };
                                                        setOrderData({
                                                            address: updated,
                                                        });
                                                        return updated;
                                                    })
                                                }
                                                className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div className="text-right">
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setOrderData({
                                                        address: address,
                                                    });
                                                }}
                                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
                                            >
                                                Simpan
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Order;
