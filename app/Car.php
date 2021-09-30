<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = 'cars';
    protected $fillable = [
        'name', 'image', 'rate',
    ];

    public function getCarById($carId) {
        $car = Car::where('id', '=', $carId)->get();
        if (isset($car) && count($car) > 0) {
            return $car[0];
        } else {
            return null;
        }
    }
}
