<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use App\Mail;

class MeController extends Controller
{
    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    public function getUsers(Request $request)
    {
        $users = DB::table('users')->where('user_type','member')->orderBy('id', 'DESC')->get();
        return response()->json($users);
    }

    public function setUserAction(Request $request)
    {
        var_dump('setUserAction',$request->action,$request->id);
        $affected = false;
        $status;
        if( strcmp($request->action , 'accept' ) == 0 )
        {   
            $status = 'approved';
            $affected = DB::table('users')
                            ->where('id', $request->id)
                            ->update(['ready_review' => 1]);
        }
        if( strcmp($request->action , 'reject' ) == 0 )
        {
            $status = 'rejected';
            $affected = DB::table('users')
                            ->where('id', $request->id)
                            ->update(['ready_review' => 0]);
        }
        if( strcmp($request->action , 'delete' ) == 0 )
        {
            $status = 'rejected';
            $affected = DB::table('users')
                            ->where('id', $request->id)
                            ->delete();
        }

        $mail = new Mail();
        $mail->sendUserRegStatusEmail($request->id, $status);

        return response()->json(['status' => $affected], 200);
    }
}
