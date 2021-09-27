<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class AvailabilityController extends Controller
{
    public function getAvailableCars(Request $request)
    {
        return new UserResource($request->user());
    }
}
