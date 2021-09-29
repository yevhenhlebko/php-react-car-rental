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
            'image' => '',
            'rate' => 100
        ]);
        DB::table('cars')->insert([
            'name' => 'Lamborghini Huracan',
            'image' => '',
            'rate' => 150
        ]);
        DB::table('cars')->insert([
            'name' => '2021 Chevrolet Corvette 3LT Z51 ',
            'image' => '',
            'rate' => 190
        ]);
    }
}
