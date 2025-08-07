export function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
}

export const percentageStatus = (status) => {
    switch (status) {
        case "menunggu":
            return 10;
            break;
        case "dikonfirmasi":
            return 20;
            break;
        case "dijemput":
            return 30;
            break;
        case "diterima":
            return 40;
            break;
        case "diproses":
            return 50;
            break;
        case "selesai":
            return 70;
            break;
        case "diantar":
            return 90;
            break;
        case "dimbil":
            return 100;
            break;
        default:
            return 0;
            break;
    }
};

export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
