<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;

class MeController extends Controller
{
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    public function getUsers(Request $request)
    {
        $users = DB::table('users')->where('user_type','member')->get();
        return response()->json($users);
    }

    public function setUserAction(Request $request)
    {
        var_dump($request->action,$request->id);
        $affected = false;
        if( strcmp($request->action , 'accept' ) == 0 )
        {
            $affected = DB::table('users')
                            ->where('id', $request->id)
                            ->update(['ready_review' => 1]);
        }
        if( strcmp($request->action , 'reject' ) == 0 )
        {
            $affected = DB::table('users')
                            ->where('id', $request->id)
                            ->update(['ready_review' => 0]);
        }
        if( strcmp($request->action , 'delete' ) == 0 )
        {
            $affected = DB::table('users')
                            ->where('id', $request->id)
                            ->delete();
        }
        return $affected;
    }
}
