<?php

Namespace App;
use Illuminate\Database\Eloquent\Model;
require '../vendor/autoload.php';
require '../config/mail.php';
use Mailgun\Mailgun;
use App\User;
use App\Car;
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

    public function sendReservationConStatusEmail($userId, $carId, $status) {
        $user = User::find($userId);
        $car = Car::find($carId);
        $subject = '[AJ’s Experience] Reservation Status';
        $body = '<html>Hi ' . $user->name .
                ' Your Reservation for ' . $car ->name . ' has been ' . $status . '</html> ';
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
}