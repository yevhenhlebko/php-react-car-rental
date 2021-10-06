<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use App\GoCodes;
use App\Mail;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'email' => 'email|required|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $goCode = $request->goCode;
        $found = GoCodes::where('code', $goCode)->first();

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'ready_review' => $found ? '1' : '0',
            'go_code' => $found ? $goCode : null,
            'user_type' => 'member',
            'password' => bcrypt($request->password),
        ]);

        if ($found) {
            GoCodes::where('code', $goCode)
            ->update(['user_id' => $user -> id]);
        }

        $users = DB::table('users')->where('user_type','Administrator')->get();

        if (!$token = auth()->attempt($request->only(['email', 'password']))) {
            return abort(401);
        }

        if(!$goCode) {
            $mail = new Mail();
            $mail->sendUserRegEmail($user -> id);
        }

        return (new UserResource($user))
            ->additional(['meta' => ['token' => $token]]);
    }


    public function application(Request $request)
    {

        $this->validate($request, [
            'name' => 'required|string|min:4|max:255'
        ]);

        $id = auth()->id();
        $user = User::find($id);
        $user->name = $request->name;
        $user->ready_review = '0';
        $user->save();

        auth()->logout();

        return (new UserResource($user));

    }
}
