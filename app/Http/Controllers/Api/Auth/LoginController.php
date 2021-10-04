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
        //auth user with go code
        $goCode = $request->goCode;
        if ($goCode) {
            $user = DB::table('users')->where('go_code',strval($goCode))->get()->first();
            if(!$user) {
                return response()->json([
                    'errors' => [
                        'goCode' => ['invalid go code.']
                    ]
                ], 422);
            } else {
                $email = strval($goCode) . '@ajsexperience.com';
                $token = auth()->attempt(array('email' =>  $email,'password' => strval($goCode)));
                error_log($token);
                if (!$token) {
                    return response()->json([
                        'errors' => [
                            'goCode' => ['invalid go code.']
                        ]
                    ], 422);
                }
                $user = DB::table('users')->where('go_code',strval($goCode))->get()->first();
                return (new UserResource($user))
                ->additional([
                    'meta' => [
                        'token' => $token
                    ]
                ]);
            }
        }

        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ( !$token = auth()->attempt($request->only(['email', 'password']))) {
            return response()->json([
                'errors' => [
                    'email' => ['Sorry we couldn\'t sign you in with those details.']
                ]
            ], 422);
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
