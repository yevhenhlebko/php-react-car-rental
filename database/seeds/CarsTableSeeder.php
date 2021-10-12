<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cars')->insert([
            'name' => '2021 Nissan Skyeline GTR',
            'image' => '/images/car-image-1.png',
            'rate' => 600
        ]);
        DB::table('cars')->insert([
            'name' => 'Lamborghini Huracan',
            'image' => '/images/car-image-2.png',
            'rate' => 700
        ]);
        DB::table('cars')->insert([
            'name' => '2021 Chevrolet Corvette 3LT Z51',
            'image' => '/images/car-image-3.png',
            'rate' => 500
        ]);
    }
}
