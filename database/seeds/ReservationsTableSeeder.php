<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReservationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reservations')->insert([
            'car_id' => $this->getRandomCarId(),
            'user_id' => $this->getRandomUserId(),
            'reserved_date_time' => Carbon::create(2021, 10, 01, 10, 30, 0, 'GMT')->toDateTimeString(),
            'due_date_time' => Carbon::create(2021, 10, 01, 18, 30, 0, 'GMT')->toDateTimeString(),
            'total_hour' => 8,
            'total_cost' => 800,
            'enable' => true,
        ]);
        DB::table('reservations')->insert([
            'car_id' => $this->getRandomCarId(),
            'user_id' => $this->getRandomUserId(),
            'reserved_date_time' => Carbon::create(2021, 10, 03, 03, 0, 0, 'GMT')->toDateTimeString(),
            'due_date_time' => Carbon::create(2021, 10, 03, 8, 0, 0, 'GMT')->toDateTimeString(),
            'total_hour' => 5,
            'total_cost' => 750,
            'enable' => true,
        ]);
        DB::table('reservations')->insert([
            'car_id' => $this->getRandomCarId(),
            'user_id' => $this->getRandomUserId(),
            'reserved_date_time' => Carbon::create(2021, 10, 05, 9, 15, 0, 'GMT')->toDateTimeString(),
            'due_date_time' => Carbon::create(2021, 10, 05, 19, 15, 0, 'GMT')->toDateTimeString(),
            'total_hour' => 10,
            'total_cost' => 1900,
            'enable' => true,
        ]);
    }

    private function getRandomUserId() {
        $user = \App\User::inRandomOrder()->first();
        return $user->id;
    }

    private function getRandomCarId() {
        $car = \App\Car::inRandomOrder()->first();
        return $car->id;
    }
}
