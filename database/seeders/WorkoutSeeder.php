<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Workout;
use Faker\Factory as Faker;

class WorkoutSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            Workout::create([
                'user_id' => 1,
                'split_id' => rand(1, 10),
                'notes' => $faker->sentence(),
                'calories' => $faker->numberBetween(100, 800),
                'time' => $faker->numberBetween(15, 120), // Time in minutes between 15 and 120
                'datetime' => $faker->dateTimeBetween('-1 month', 'now'), // Random date within the last month
            ]);
        }
    }
}
