<?php

Namespace App;
use Illuminate\Database\Eloquent\Model;
require '../vendor/autoload.php';
require '../config/mail.php';
use Mailgun\Mailgun;
use App\User;
use App\Car;
use App\Reservation;
use Carbon\Carbon;

class Mail extends Model
{
    private $mg;
    private $domain;

    function __construct() {
        $this->mg = Mailgun::create(\Config::get('mail.MailGunAPI'));
        $this->domain = 'postman.ajsexperience.com';
    }

    public function sendReservationEmail($userId, $carId, $startDate, $endDate, $hours) {
        
        $emails = User::select('email')
        ->where('user_type', '=', 'Administrator')
        ->get()
        ->pluck('email')
        ->toArray();
        $user = User::find($userId);
        $car = Car::find($carId);
        $subject = '[AJ’s Experience] Pending reservation from ' . $user->name;
        $body = $user->name . 
                '<html> requested' .
                '<br> car: '. $car ->name . 
                '<br> time: ' . $hours . ' hours ' .
                '<br> on: ' . Carbon::parse($startDate)->setTimezone('America/Los_Angeles')->format('m/d/Y g:i A') . 
                '<br> to: ' . Carbon::parse($endDate)->setTimezone('America/Los_Angeles')->format('m/d/Y g:i A') .
                '<br> manage reservations <a href="https://www.ajsexperience.com/login">here</a> </html>';
    
        $this ->  mg->messages()->send($this -> domain, [
        'from'    => 'aj@postman.ajsexperience.com',
        'to'      => $emails,
        'subject' => $subject,
        'html'    => $body,
        ]);
    }

    public function sendUserRegEmail($userId) {
        $emails = User::select('email')
        ->where('user_type', '=', 'Administrator')
        ->get()
        ->pluck('email')
        ->toArray();
        $user = User::find($userId);
        $subject = '[AJ’s Experience] Pending registration from ' . $user->name;
        $body = $user->name . 
                '<html> requested to join ajsexperience.' .
                '<br> manage registration <a href="https://www.ajsexperience.com/login">here</a> </html>';
    
        $this ->  mg->messages()->send($this -> domain, [
        'from'    => 'aj@postman.ajsexperience.com',
        'to'      => $emails,
        'subject' => $subject,
        'html'    => $body,
        ]);
    }

    public function sendReservationConStatusEmail($reservationId, $status, $reason = null) {
        $reservation = Reservation::find($reservationId);
        $car = Car::find($reservation->car_id);
        $user = User::find($reservation->user_id);
        $subject = '[AJ’s Experience] Reservation Status';
        $body_content = 'Hi ' . $user->name .
            ' Your Reservation for ' . $car ->name . ' has been ' . $status;

        // add reason for reject
        if ($status === 'rejected') {
            if ($reason !== null) {
                $body_content .= '<br/>Reject Reason: ' . $reason;
            } else {
                $body_content .= '<br/>Reject Reason: Not given';
            }
        }
        $body = '<html>' . $body_content . '</html>';

        $this ->  mg->messages()->send($this -> domain, [
        'from'    => 'aj@postman.ajsexperience.com',
        'to'      => $user->email,
        'subject' => $subject,
        'html'    => $body,
        ]);
    }

    public function sendUserRegStatusEmail($userId, $status) {
        $user = User::find($userId);
        $subject = '[AJ’s Experience] Registration Status';
        $body = '<html>Hi ' . $user->name .
                ' Your request to join ajsexperience has been ' . $status . '</html> ';
    
        $this ->  mg->messages()->send($this -> domain, [
        'from'    => 'aj@postman.ajsexperience.com',
        'to'      => $user->email,
        'subject' => $subject,
        'html'    => $body,
        ]);
    }

    // Send link for reset password
    public function sendForgotPasswordEmail($email, $token) {
        $user = User::whereEmail($email)->first();
        $subject = '[AJ’s Experience] Forgot Password';
        $body = '<html>Hi ' . $user->name .
                ',<br/>Please click the following link to reset your password.<br/><a href="https://www.ajsexperience.com/reset-password/' . $token . '">Click here</a></html> ';
    
        $this ->  mg->messages()->send($this -> domain, [
        'from'    => 'aj@postman.ajsexperience.com',
        'to'      => $user->email,
        'subject' => $subject,
        'html'    => $body,
        ]);
    }
}