<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Reservation;

class AvailabilityController extends Controller
{
    public function getDisabledCars(Request $request)
    {
        $reservationDb = new Reservation();
        $result = $reservationDb->getDisabledCars($request->startdate, $request->enddate);
        return response()->json($result);
    }
}
