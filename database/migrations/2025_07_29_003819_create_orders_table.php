<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_price',10,2);
            $table->enum('status',['menunggu','dikonfirmasi','dijemput','diterima','diproses','selesai','diantar','diambil']);
            $table->enum('payment_method',['cod','transfer']);
            $table->boolean('is_paid')->default(false);
            $table->enum('pickup_opyion',['antar','jemput']);
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
