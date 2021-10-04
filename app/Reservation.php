<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Car;

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

    public function getDisabledCars($startDate, $endDate)
    {
        $reservations = Reservation::whereDate('reserved_date_time', '<=', \DateTime::createFromFormat('Y-m-d H:i', $endDate))
            ->whereDate('due_date_time', '>=', \DateTime::createFromFormat('Y-m-d H:i', $startDate))
            ->get();
        $carIds = collect($reservations)->map(function ($reservation) {
            return $reservation->car_id;
        })->unique();
        return $carIds;
    }

    public function confirmReservation($startDate, $endDate, $carId, $userId, $hours)
    {
        try {
            $reservations = Reservation::whereDate('reserved_date_time', '<=', \DateTime::createFromFormat('Y-m-d H:i', $endDate))
                ->whereDate('due_date_time', '>=', \DateTime::createFromFormat('Y-m-d H:i', $startDate))
                ->where('car_id', '=', $carId)
                ->get();
            if (isset($reservations) && count($reservations)) {
                return false;
            } else {
                $carDb = new Car();
                $car = $carDb->getCarById($carId);

                if (isset($car)) {
                    Reservation::create([
                        'car_id' => $carId,
                        'user_id' => $userId,
                        'reserved_date_time' => $startDate,
                        'due_date_time' => $endDate,
                        'total_hour' => $hours,
                        'total_cost' => $hours * $car->rate,
                        'enable' => true
                    ]);
                }
                return true;
            }
        } catch(Exception $e) {
            return false;
        }
    }

    public function acceptReservation($id)
    {
        try {
            $res = Reservation::where('id', $id)->update(['status' => 'accepted']);
            return $res;
        } catch (Exception $e) {
            return false;
        }
    }

    public function declineReservation($id)
    {
        try {
            $res = Reservation::where('id', $id)->delete();
            return $res;
        } catch (Exception $e) {
            return false;
        }
    }
}
