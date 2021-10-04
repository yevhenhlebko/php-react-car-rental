<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\GoCodes;

class GoCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $foundAll = GoCodes::all();
            return response()->json($foundAll);
        } catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $goCode = rand(10000, 99999);
            //logic to create a unique go code
            $found = GoCodes::where('code', $goCode)->first();
            while($found) {
                $goCode = rand(10000, 99999);
                $found = GoCodes::where('code', $goCode)->first();
            }

            GoCodes::create([
                'code' => $goCode,
            ]);

            $found = GoCodes::where('code', $goCode)->first();

            return response()->json($found);
        } catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
