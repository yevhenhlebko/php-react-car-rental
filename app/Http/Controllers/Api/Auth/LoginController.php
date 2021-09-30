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

        // $user = DB::table('users')->where('email',$request->email)->get()->first();
        // $ready_review = $user->ready_review;
        // var_dump($ready_review);

        if ( !$token = auth()->attempt($request->only(['email', 'password']))) {
            return response()->json([
                'errors' => [
                    'email' => ['Sorry we couldn\'t sign you in with those details.']
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
