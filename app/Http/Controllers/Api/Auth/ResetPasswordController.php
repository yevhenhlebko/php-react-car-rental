<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Hash;

use App\User;

class ResetPasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    // Reset password
    public function reset(Request $request) {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);

        // Get record for email & token
        $updatePassword = DB::table('password_resets')
                            ->where([
                              'email' => $request->email, 
                              'token' => $request->token
                            ])
                            ->first();

        // Check token validation
        if(!$updatePassword) {
            return response()->json(['error' => 'Invalid token!'], 400);
        }

        // Update password
        $user = User::where('email', $request->email)
                    ->update(['password' => Hash::make($request->password)]);

        // Delete record for token
        DB::table('password_resets')->where(['email'=> $request->email])->delete();

        return response()->json(['message', 'Your password has been changed!']);
    }
}
