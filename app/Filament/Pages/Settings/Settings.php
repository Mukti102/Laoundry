<?php

namespace App\Filament\Pages\Settings;

use Closure;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Illuminate\Support\Facades\Http;
use Outerweb\FilamentSettings\Filament\Pages\Settings as BaseSettings;

class Settings extends BaseSettings
{
    public static function getNavigationSort(): int
    {
        return 4;
    }

    public static function getNavigationLabel(): string
    {
        return 'Setting';
    }

    protected static string $settings = 'default'; // sesuaikan kalau kamu pakai multiple group

    public function schema(): array|Closure
    {
        return [
            Tabs::make('Settings')
                ->schema([
                    Tabs\Tab::make('General')
                        ->schema([
                            Card::make()
                                ->schema([
                                    TextInput::make('general.site_name')
                                        ->label('Nama Situs')
                                        ->required()
                                        ->maxLength(100),
                                    TextInput::make('general.tagline')
                                        ->label('Tagline')
                                        ->maxLength(150),
                                    FileUpload::make('general.logo')
                                        ->label('Logo')
                                        ->imageEditor()
                                        ->image()
                                        ->imagePreviewHeight('100')
                                        ->directory('settings')
                                        ->maxSize(1024) // dalam KB
                                        ->helperText('Logo utama, optimal png/svg, max 1MB'),
                                    FileUpload::make('general.favicon')
                                        ->label('Favicon')
                                        ->image()
                                        ->imageEditor()
                                        ->imagePreviewHeight('64')
                                        ->directory('settings')
                                        ->maxSize(256)
                                        ->helperText('Favicon square, optimal 32x32 atau 64x64'),

                                ])->columns(2),
                        ]),
                    Tabs\Tab::make('SEO')
                        ->schema([
                            Card::make()
                                ->schema([
                                    TextInput::make('seo.title')
                                        ->label('Judul SEO')
                                        ->maxLength(60),
                                    TextInput::make('seo.description')
                                        ->label('Deskripsi SEO')
                                        ->maxLength(160),
                                    TextInput::make('seo.keywords')
                                        ->label('Kata Kunci')
                                        ->helperText('Dipisah dengan koma, misal: laundry, cepat, terjangkau'),
                                ]),
                        ]),
                    Tabs\Tab::make('Contact')
                        ->schema([
                            Card::make()
                                ->schema([
                                    Select::make('address.provinsi')
                                        ->label('Provinsi')
                                        ->helperText('Contoh: Jawa Timur')
                                        ->options(function () {
                                            $response = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");

                                            if ($response->successful()) {
                                                return collect($response->json())
                                                    ->pluck('name', 'name') // pakai name sebagai key dan value
                                                    ->toArray();
                                            }

                                            return [];
                                        })
                                        ->reactive(),
                                    Select::make('address.kota')
                                        ->label('Kota/Kabupaten')
                                        ->helperText('Contoh: Surabaya')
                                        ->options(function (callable $get) {
                                            $provinsiName = $get('address.provinsi');

                                            if (!$provinsiName) return [];

                                            // Ambil semua provinsi untuk cari ID berdasarkan name
                                            $provinsi = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")->collect()
                                                ->firstWhere('name', $provinsiName);

                                            if (!$provinsi) return [];

                                            $response = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/{$provinsi['id']}.json");

                                            if ($response->successful()) {
                                                return collect($response->json())
                                                    ->pluck('name', 'name')
                                                    ->toArray();
                                            }

                                            return [];
                                        })
                                        ->reactive()
                                        ->disabled(fn(callable $get) => !$get('address.provinsi')),


                                    Select::make('address.kecamatan')
                                        ->label('Kecamatan')
                                        ->helperText('Contoh: Panti')
                                        ->options(function (callable $get) {
                                            $kotaName = $get('address.kota');

                                            if (!$kotaName) return [];

                                            // Ambil semua kota dari provinsi yang dipilih
                                            $provinsiName = $get('address.provinsi');
                                            if (!$provinsiName) return [];

                                            $provinsi = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")->collect()
                                                ->firstWhere('name', $provinsiName);
                                            if (!$provinsi) return [];

                                            $kota = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/{$provinsi['id']}.json")->collect()
                                                ->firstWhere('name', $kotaName);
                                            if (!$kota) return [];

                                            $response = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/districts/{$kota['id']}.json");

                                            if ($response->successful()) {
                                                return collect($response->json())
                                                    ->pluck('name', 'name')
                                                    ->toArray();
                                            }

                                            return [];
                                        })
                                        ->disabled(fn(callable $get) => !$get('address.kota')),
                                    TextInput::make('contact.address')
                                        ->helperText('Contoh : Jl.Rajawali No 45,Panti,Jember,Jawa Timur')
                                        ->label('Alamat Lengkap')
                                        ->maxLength(255),
                                    TextInput::make('contact.phone')
                                        ->label('Nomor Telepon')
                                        ->tel()
                                        ->maxLength(30),
                                    TextInput::make('contact.email')
                                        ->label('Email')
                                        ->email(),
                                    Textarea::make('contact.opening_hours')
                                        ->label('Jam Operasional')
                                        ->helperText('Contoh: Senin–Sabtu, 08:00–18:00')
                                        ->rows(3),
                                ])->columns(2),
                        ]),
                    Tabs\Tab::make('Social')
                        ->schema([
                            Card::make()
                                ->schema([
                                    TextInput::make('social.facebook')
                                        ->label('Facebook URL')
                                        ->url()
                                        ->maxLength(255),
                                    TextInput::make('social.instagram')
                                        ->label('Instagram URL')
                                        ->url()
                                        ->maxLength(255),
                                    TextInput::make('social.tiktok')
                                        ->label('TikTok URL')
                                        ->url()
                                        ->maxLength(255),
                                    TextInput::make('social.youtube')
                                        ->label('YouTube URL')
                                        ->url()
                                        ->maxLength(255),
                                ]),
                        ]),
                    Tabs\Tab::make('Payment Gateaway')
                        ->schema([
                            Card::make()
                                ->schema([
                                    TextInput::make('payment.merchant_id')
                                        ->label('Merchant ID')
                                        ->nullable(),
                                    TextInput::make('payment.client_key')
                                        ->label('Client Key')
                                        ->nullable(),
                                    TextInput::make('payment.server_key')
                                        ->label('Server Key')
                                        ->nullable(),
                                    Toggle::make('payment.is_production')
                                        ->label('Production')
                                        ->default(false)
                                        ->nullable(),
                                ]),
                        ]),
                ]),
        ];
    }
}
