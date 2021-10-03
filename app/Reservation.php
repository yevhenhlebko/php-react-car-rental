<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Car;
use Carbon\Carbon;

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
        try {
            $sDate = Carbon::create($startDate)->toDateString();
            $eDate = Carbon::create($endDate)->toDateString();
            $sTime = Carbon::create($startDate)->toTimeString();
            $eTime = Carbon::create($endDate)->toTimeString();
            $reservations = Reservation::orWhere(function($query) use ($sDate, $sTime) {
                    $query->whereDate('reserved_date_time', '=', $sDate)
                        ->whereTime('reserved_date_time', '>', $sTime);
                })
                ->orWhere(function($query) use ($eDate, $eTime)  {
                    $query->whereDate('due_date_time', '=', $eDate)
                        ->whereTime('due_date_time', '<', $eTime);
                })
                ->orWhere(function($query) use ($sDate) {
                    $query->whereDate('reserved_date_time', '>=', $sDate)
                        ->whereDate('due_date_time', '<=', $sDate);
                })
                ->orWhere(function($query) use ($eDate) {
                    $query->whereDate('reserved_date_time', '>=', $eDate)
                        ->whereDate('due_date_time', '<=', $eDate);
                })
                ->get();

            $carIds = collect($reservations)->map(function ($reservation) {
                return $reservation->car_id;
            })->unique();
            return $carIds;
        } catch(Exception $e) {
            return false;
        }
    }

    public function confirmReservation($id) {
        try {
            $reservations = Reservation::find($id);
            $reservations->enable = true;
            $reservations->save();
            return $reservations;
        } catch(Exception $e) {
            return false;
        }
    }

    public function pendReservation($startDate, $endDate, $carId, $userId, $hours) {
        try {

            $reservations = Reservation::getDisabledCars($startDate, $endDate);
            $reservationsByCarId = $reservations->search($carId);

            if (isset($reservationsByCarId) && $reservationsByCarId !== false) {
                return false;
            } else {
                $carDb = new Car();
                $car = $carDb->getCarById((int)$carId);

                if(!$car) {
                    return false;
                }

                $reservations = Reservation::create([
                    'car_id' => $carId,
                    'user_id' => $userId,
                    'reserved_date_time' => Carbon::create($startDate)->toDateTimeString(),
                    'due_date_time' => Carbon::create($endDate)->toDateTimeString(),
                    'total_hour' => $hours,
                    'total_cost' => $hours * $car->rate,
                    'enable' => false
                ]);

                return $reservations;
            }
        } catch(Exception $e) {
            return false;
        }
    }

    public function getReservationList(){
        try{
            $reservations = Reservation::where('enable', false)->get();
            return $reservations;
        } catch(Exception $e) {
            return false;
        }
    }
}
