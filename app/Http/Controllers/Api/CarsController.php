<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Car;

class CarsController extends Controller
{
    public function getAll(Request $request)
    {
        $cars = DB::table('cars')->get();
        return response()->json($cars);
    }
}
