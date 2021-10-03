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

    public function confirmReservation(Request $request) {
        $reservationDb = new Reservation();
        $result = $reservationDb->confirmReservation($request->id);
        return response()->json(array(
            'reservation' => $result,
        ));
    }

    public function pendReservation(Request $request) {
        $reservationDb = new Reservation();
        $result = $reservationDb->pendReservation($request->startdate, $request->enddate, $request->carid, $request->userid, $request->hours);
        return response()->json(array(
            'reservation' => $result,
        ));
    }

    public function getReservationList(Request $request) {
        $reservationDb = new Reservation();
        $result = $reservationDb->getReservationList();
        return response()->json(array(
            'reservation' => $result,
        ));
    }
}
