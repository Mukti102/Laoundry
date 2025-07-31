<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Midtrans\Snap;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required',
            'address' => 'required',
            'pickupDate' => 'required',
            'pickupTime' => 'required',
            'deliveryDate' => 'required',
            'deliveryTime' => 'required',
            'serviceId' => 'required',
            'notes' => 'nullable',
        ]);

        $service = Service::findOrFail($validated['serviceId']);

        $validated['user_id'] =  Auth::user()->id;
        $validated['total_price'] = $request->weight * $service->price_per_kg;
        $validated['status'] = 'menunggu';
        $validated['payment_method'] = 'transfer';
        $validated['pickup_opyion'] = 'jemput';
        $validated['address'] = $validated['address']['title'] . $validated['address']['detail'];
        $validated['pickup_date'] = $validated['pickupDate'];
        $validated['pickup_time'] = $validated['pickupTime'];
        $validated['deliver_date'] = $validated['deliveryDate'];
        $validated['deliver_time'] = $validated['deliveryTime'];
        $validated['service_id'] = $validated['serviceId'];
        $validated['reference'] = 'ORD-' . now()->format('Ymd') . '-' . strtoupper(Str::random(10));


        \Midtrans\Config::$serverKey =  config('payment.midtrans.server_key');
        \Midtrans\Config::$isProduction =  config('payment.midtrans.isProduction');
        \Midtrans\Config::$isSanitized =  config('payment.midtrans.isSanitized');
        \Midtrans\Config::$is3ds =  config('payment.midtrans.is3ds');





        try {
            $order = Order::create($validated);

            $payload = [
                'transaction_details' => [
                    'order_id' => $order->id,
                    'gross_amount' => $order->total_price,
                ],
                'customer_details' => [
                    'first_name' => Auth::user()->name,
                    'phone' => $request->phone,
                    'email' => Auth::user()->email, // Jika belum ada email dari user
                ]
            ];

            $snapToken = Snap::getSnapToken($payload);
            Log::info('Snap Token Generated: ' . $snapToken);


            session(['snaptoken' => $snapToken]); // ✅ simpan benar ke session


            return to_route('order.review', $order->reference);
        } catch (Exception $e) {
            Log::info('error', ['message' => $e->getMessage()]);
            return back()->with('error', 'Gagal');
        }
    }


    public function review($reference)
    {
        $order = Order::where('reference', $reference)->first();
        $snapToken  = session('snaptoken');
        $midtrants_client_key = config('payment.midtrans.client_key');
        return Inertia::render('Order/DetailOrder', [
            'order' => $order,
            'snapToken' => $snapToken,
            'clientKey' => $midtrants_client_key
        ]);
    }

    public function updatePaidStatus(Request $request, $id)
    {
        $order = Order::find($id);
        $order->update([
            'is_paid' => true
        ]);



        try {
            $transaction = Transaction::create([
                'order_id' => $order->id,
                'reference' => 'TRX-' . now()->format('Ymd') . '-' . strtoupper(Str::random(10)),
                'payment_type' => $request->payment_type,
                'payment_method' => $request->payment_method['bank'],
                'total' => $request->total,
                'status' => 'success',
            ]);

            return response()->json([
                'message' => 'Success',
                'data' => $transaction,
            ], 200);
        } catch (Exception $e) {
            Log::info('error transaction',['message' => $e->getMessage()]);
            return response()->json([
                'message' => 'error',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
