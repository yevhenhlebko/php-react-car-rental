<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{

    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);
        try {
            if ( !$token = auth()->attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'errors' => [
                        'email' => ['Sorry we couldn\'t sign you in with those details.']
                    ]
                ], 422);
            }
    
        } catch (Exception $e) {
            return $e->getMessage();
        }

        $user = DB::table('users')->where('email',$request->email)->get()->first();
        $ready_review = $user->ready_review;

        if($ready_review == '0')
        {
            return response()->json([
                'errors' => [
                    'email' => ['An admin has not accepted your registration.']
                ]
            ], 422);
        }

        return (new UserResource($request->user()))
            ->additional([
                'meta' => [
                    'token' => $token
                ]
            ]);
    }
}
