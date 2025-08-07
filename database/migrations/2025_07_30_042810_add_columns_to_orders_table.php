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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('weight');
            $table->string('pickup_date'); 
            $table->string('pickup_time'); 
            $table->string('deliver_date'); 
            $table->string('deliver_time'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('weight');
            $table->dropColumn('pickup_date');
            $table->dropColumn('pickup_time');
            $table->dropColumn('deliver_date');
            $table->dropColumn('deliver_time');
        });
    }
};
