<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Reservation;
use App\Mail;

class AvailabilityController extends Controller
{
    public function getDisabledCars(Request $request)
    {
        $reservationDb = new Reservation();
        $result = $reservationDb->getDisabledCars($request->startDate, $request->endDate);
        return response()->json($result);
    }

    public function confirmReservation(Request $request) {
        $reservationDb = new Reservation();
        $result = $reservationDb->confirmReservation($request->id);

        $mail = new Mail();
        $mail->sendReservationConStatusEmail($request->id, 'approved');

        return response()->json(array(
            'reservation' => $result,
        ));
    }

    public function rejectReservation(Request $request) {
        // Input validation
        $request->validate([
            'id' => 'required|exists:reservations',
            'reject' => 'nullable|string|max:255'
        ]);

        $reservationDb = new Reservation();
        $reason = !isset($request->reason) || trim($request->reason) === '' ? null : $request->reason;

        // update db
        $result = $reservationDb->rejectReservation($request->id, $reason);

        $mail = new Mail();
        $mail->sendReservationConStatusEmail($request->id, 'rejected', $reason);

        return response()->json(array(
            'reservation' => $result,
        ));
    }

    public function pendReservation(Request $request) {
        $reservationDb = new Reservation();
        $result = $reservationDb->pendReservation($request->startDate, $request->endDate, $request->carId, $request->userId, $request->hours);
        $mail = new Mail();
        $mail->sendReservationEmail($request->userId, $request->carId, $request->startDate, $request->endDate, $request->hours);

        return response()->json(array(
            'reservation' => $result,
        ));
    }

    public function getReservationList(Request $request) {
        $reservationDb = new Reservation();
        $result = $reservationDb->getReservationList();
        return response()->json(array(
            'reservations' => $result,
        ));
    }
}
