<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'user_type' => 'Administrator',
            'go_code' => 'gocode',
            'remember_token' => Str::random(10)
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => 'member',
            'ready_review' => '0',
            'remember_token' => Str::random(10)
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => 'member',
            'ready_review' => '0',
            'remember_token' => Str::random(10)
        ]);
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
            'user_type' => 'member',
            'ready_review' => '0',
            'remember_token' => Str::random(10)
        ]);
    }
}
