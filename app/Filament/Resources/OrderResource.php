<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use Illuminate\Support\Str;

use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationLabel = 'Pesanan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Pesanan')
                    ->description('Data-Data Pesanan Users')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required(),
                        Forms\Components\Select::make('service_id')
                            ->relationship('service', 'name')
                            ->required(),

                        TextInput::make('weight')
                            ->label('Berat')
                            ->suffix('Kg')
                            ->numeric()
                            ->live(onBlur: true)
                            ->required()
                            ->afterStateUpdated(function (Set $set, $state, callable $get) {
                                $serviceId = $get('service_id');
                                $weight = floatval($state);

                                if ($serviceId && is_numeric($weight)) {
                                    $service = Service::find($serviceId);
                                    if ($service) {
                                        $total = $weight * $service->price_per_kg;
                                        $set('total_price', $total);
                                    }
                                }
                            }),


                        TextInput::make('total_price')
                            ->label('Total Harga')
                            ->prefix('Rp')
                            ->disabled()
                            ->dehydrated()
                            ->numeric()
                            ->required(),

                        DatePicker::make('pickup_date')
                            ->label('Tanggal Penjemputan')
                            ->required(),

                        TimePicker::make('pickup_time')
                            ->label('Waktu Penjemputan')
                            ->time()
                            ->required(),
                        DatePicker::make('deliver_date')
                            ->label('Tanggal Pengantaran')
                            ->required(),

                        TimePicker::make('deliver_time')
                            ->label('Waktu Pengantaran')
                            ->time()
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->options([
                                'menunggu' => 'Menunggu',
                                'diterima' => 'Diterima',
                                'diproses' => "Di Proses",
                                'selesai' => "Selesai",
                                'diantar'  => 'Di Antar',
                                'diambil'  => 'Di Ambil'
                            ])
                            ->required(),
                        Forms\Components\Select::make('payment_method')
                            ->label('Methode Pembayaran')
                            ->options([
                                'cod' => 'COD',
                                'transfer' => "Transfer"
                            ])
                            ->required(),
                        Forms\Components\Toggle::make('is_paid')
                            ->label('Status Pembayaran')
                            ->required(),
                        Forms\Components\Select::make('pickup_opyion')
                            ->label('Pickup Option')
                            ->options([
                                'antar' => 'Antar',
                                'jemput' => 'Jemput'
                            ])
                            ->required(),
                        Forms\Components\Textarea::make('address')
                            ->label('Alamat Lengkap')
                            ->placeholder('JL.Rajawali Kemuningsari lor 02 Jember Jawa timur Depan Toko Bangunan')
                            ->columnSpanFull(),
                    ])->columns(2)

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('weight')
                    ->label('Berat')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'menunggu' => 'gray',
                        'diterima' => 'info',
                        'diproses' => 'warning',
                        'selesai' => 'success',
                        'diantar' => 'primary',
                        'diambil' => 'secondary',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('payment_method')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'cod' => 'warning',
                        'transfer' => 'success',
                        default => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_paid')
                    ->label('Status Pembayaran')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
