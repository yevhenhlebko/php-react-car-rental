<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Carbon\Carbon; 
use DB;

use App\Mail;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    // create forgot password token and send it in email
    public function forgot(Request $request) {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        // create token
        $token = Str::random(64);

        // add record to db
        DB::table('password_resets')->insert([
            'email' => $request->email, 
            'token' => $token, 
            'created_at' => Carbon::now()
        ]);

        // send email
        $mail = new Mail();
        $mail->sendForgotPasswordEmail($request->email, $token);

        // return success state
        return response()->json(['message' => 'Reset password link sent on your email.']);
    }
}
