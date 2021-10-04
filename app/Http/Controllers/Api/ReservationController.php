<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Reservation;

class ReservationController extends Controller
{
    public function getAllReservations()
    {
        $reservations = DB::table('reservations')->get();
        return response()->json($reservations);
    }

    public function acceptReservation(Request $request)
    {
        $reservationDb = new Reservation();
        $id = $request->input('id');
        $result = $reservationDb->acceptReservation($id);
        return response()->json(['success' => $result]);
    }

    public function declineReservation(Request $request)
    {
        $reservationDb = new Reservation();
        $id = $request->input('id');
        $result = $reservationDb->declineReservation($id);
        return response()->json(['success' => $result]);
    }
}
