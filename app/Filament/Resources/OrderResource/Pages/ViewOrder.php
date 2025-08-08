<?php

use App\Filament\Resources\OrderResource;
use Filament\Resources\Pages\ShowRecord;
use Filament\Pages\Actions\Action;
use Filament\Resources\Pages\ViewRecord;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('edit')
                ->label('Edit')
                ->url($this->getResource()::getUrl('edit', ['record' => $this->record])),
        ];
    }
}
