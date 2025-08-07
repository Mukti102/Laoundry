<?php

namespace App\Filament\Resources\ServiceResource\Widgets;

use App\Models\Order;
use App\Models\Service;
use App\Models\Transaction;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsService extends BaseWidget
{
    protected function getStats(): array
    {
        $todayStart = Carbon::now()->startOfDay();
        $todayEnd = Carbon::now()->endOfDay();

        // Pesanan hari ini (jumlah order dibuat hari ini)
        $ordersTodayCount = Order::whereBetween('created_at', [$todayStart, $todayEnd])->count();

        // Total layanan
        $totalServices = Service::count();

        // Pendapatan hari ini dari transaksi yang sukses saja.
        // Lakukan cast karena kolom `total` bertipe string.
        $revenueResult = Transaction::whereBetween('created_at', [$todayStart, $todayEnd])
            ->where('status', 'success')
            ->selectRaw('SUM(CAST(total AS DECIMAL(15,2))) as revenue')
            ->first();

        $transactionsTodaySum = $revenueResult?->revenue ?? 0;

        // Format ke Rupiah, tanpa desimal jika tidak perlu
        $formattedRevenue = 'Rp ' . number_format($transactionsTodaySum, 0, ',', '.');

        return [
            Stat::make('Pesanan Hari Ini', (string) $ordersTodayCount)
                ->description('Jumlah order yang masuk hari ini'),
            Stat::make('Total Layanan', (string) $totalServices)
                ->description('Jumlah layanan tersedia'),
            Stat::make('Pendapatan Hari Ini', $formattedRevenue)
                ->description('Total transaksi sukses hari ini'),
        ];
    }
}
