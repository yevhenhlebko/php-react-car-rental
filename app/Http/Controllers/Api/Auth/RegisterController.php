<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'email' => 'email|required|unique:users,email',
            // 'name' => 'required|string|min:4|max:255',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'email' => $request->email,
            'name' => 'user',
            'password' => bcrypt($request->password),
        ]);



        $users = DB::table('users')->where('user_type','Administrator')->get();



        if (!$token = auth()->attempt($request->only(['email', 'password']))) {
            return abort(401);
        }

        foreach($users as $admin_user)
        {
            if( strcmp($request->gocode , $admin_user->go_code ) == 0 )
            {
                $request->gocode = '1';
                return (new UserResource($request))
                    ->additional(['meta' => ['token' => $token]]);
            }
        }

        $request->gocode = '0';
        // auth()->logout();
        return (new UserResource($request))
            ->additional(['meta' => ['token' => $token]]);
    }
}
