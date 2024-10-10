<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Split;
use Faker\Factory as Faker;

class SplitSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            Split::create([
                'user_id' => 1,
                'name' => $faker->words(2, true), // Generates a 2-word name for the split
            ]);
        }
    }
}
