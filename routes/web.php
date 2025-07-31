<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TransactionController;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'services' => Service::all(),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('service', ServiceController::class);
    Route::get('/service/{service:slug}', [ServiceController::class, 'show'])->name('service.show');

    // pesanan
    Route::resource('order',OrderController::class);
    Route::put('/update-paid-status/{id}',[OrderController::class,'updatePaidStatus']);
    Route::get('/detail-order/{reference}',[OrderController::class,'review'])->name('order.review');
    Route::get('/success/{id}',[TransactionController::class,'success'])->name('payment.success');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
