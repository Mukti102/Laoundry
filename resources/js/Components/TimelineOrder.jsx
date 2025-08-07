import {
    Timeline,
    TimelineItem,
    TimelinePoint,
    TimelineContent,
    TimelineTitle,
    TimelineBody,
} from "flowbite-react";

function TimelineOrder({ order }) {
    console.log(order, "timeline");
    const statusOrders = [
        {
            status: "menunggu",
            message: "Menunggu Pembayaran",
        },
        {
            status: "dikonfirmasi",
            message: "Anda Sudah Melakukan Pembayaran",
        },
        {
            status: "dijemput",
            message: "Siapkan Barang Anda Untuk Di Jemput",
        },
        {
            status: "diterima",
            message: "Barang Anda Sudah Diterima dan Akan Diproses",
        },
        {
            status: "diproses",
            message: "Barang Anda Dalam Proses...",
        },
        {
            status: "selesai",
            message: "Barang Anda Sudah Selesai Dan Siap Diantar",
        },
        {
            status: "diantar",
            message: "Barang Anda Sedang Diantar ke Rumah",
        },
        {
            status: "diambil",
            message:
                "Barang Sudah Diterima, Terima Kasih Telah Menggunakan Layanan Kami",
        },
    ];

    // Menentukan status yang aktif berdasarkan order.status
    const currentStatusIndex = statusOrders.findIndex(
        (s) => s.status.toLowerCase() === order.status?.toLowerCase(),
    );

    // Tandai status aktif
    const updatedStatusOrders = statusOrders.map((item, index) => ({
        ...item,
        active: index <= currentStatusIndex, // semua status sampai sekarang aktif
    }));

    return (
        <Timeline className="mt-4">
            {updatedStatusOrders
                .filter((_, index) => index <= currentStatusIndex)
                .map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelinePoint color={item.active ? "green" : "gray"} />
                        <TimelineContent>
                            <TimelineTitle className="text-sm text-gray-700 mb-1 capitalize">
                                {item.status}
                            </TimelineTitle>
                            <TimelineBody className="text-xs text-gray-400">
                                {item.message}
                            </TimelineBody>
                        </TimelineContent>
                    </TimelineItem>
                ))}
        </Timeline>
    );
}

export default TimelineOrder;
