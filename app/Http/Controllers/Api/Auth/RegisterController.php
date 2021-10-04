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
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'email' => $request->email,
            'name' => 'user',
            'ready_review' => '0',
            'user_type' => 'member',
            'password' => bcrypt($request->password),
        ]);



        $users = DB::table('users')->where('user_type','Administrator')->get();



        if (!$token = auth()->attempt($request->only(['email', 'password']))) {
            return abort(401);
        }

        foreach($users as $admin_user)
        {
            if( strcmp($request->go_code , $admin_user->go_code ) == 0 )
            {
                $request->go_code = 1;
                return (new UserResource($request))
                    ->additional(['meta' => ['token' => $token]]);
            }
        }

        $request->go_code = 0;

      return (new UserResource($request))
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

    public function goCode(Request $request) {
        try {
            $goCode = rand(10000, 99999);
            //logic to create a unique go code
            $user = DB::table('users')->where('go_code',strval($goCode))->get()->first();
            while($user) {
                $goCode = rand(10000, 99999);
                $user = DB::table('users')->where('go_code',strval($goCode))->get()->first();
            }

            $email = $goCode . '@mail.com';        
            //create a user with the go code as password
            $user = User::create([
                'email' => $email,
                'name' => $request->name,
                'ready_review' => '1',
                'user_type' => 'member',
                'password' => bcrypt($goCode),
                'go_code' => strval($goCode),
            ]);
            
            return response()->json(array(
                'goCode' => $goCode
            ));
        } catch(Exception $e) {
            return false;
        }
    }
}
