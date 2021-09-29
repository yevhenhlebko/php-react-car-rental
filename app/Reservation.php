<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations';
    protected $fillable = [
        'car_id',
        'user_id',
        'reserved_date_time',
        'due_date_time',
        'total_hour',
        'total_cost',
        'enable'
    ];

    public function getDisabledCars($startDate, $endDate) {
        $reservations = Reservation::whereDate('reserved_date_time', '<=', \DateTime::createFromFormat('Y-m-d H:i', $endDate))
            ->whereDate('due_date_time', '>=', \DateTime::createFromFormat('Y-m-d H:i', $startDate))
            ->get();
        $carIds = collect($reservations)->map(function ($reservation) {
            return $reservation->car_id;
        })->unique();
        return $carIds;
    }
}
