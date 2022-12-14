<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CarsTableSeeder::class);
        $this->call(ReservationsTableSeeder::class);
        // $this->call([
        //     CarsTableSeeder::class,
        //     UsersTableSeeder::class,
        //     ReservationsTableSeeder::class
        // ]);
    }
}
