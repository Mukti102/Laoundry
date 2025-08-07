import { Badge } from "flowbite-react";


export const StatusColor = ({status}) => {
    switch (status) {
        case "menunggu":
            return (
                <Badge color="warning" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "dikonfirmasi":
            return (
                <Badge color="info" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "dijemput":
            return (
                <Badge color="purple" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "diterima":
            return (
                <Badge color="blue" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "diproses":
            return (
                <Badge color="yellow" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "selesai":
            return (
                <Badge color="success" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "diantar":
            return (
                <Badge color="warning" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        case "diambil":
            return (
                <Badge color="green" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    {status}
                </Badge>
            );
        default:
            return (
                <Badge color="gray" className="shadow-sm border rounded-full capitalize px-3 text-[10px] mx-3">
                    Tidak diketahui
                </Badge>
            );
    }
};