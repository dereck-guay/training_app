<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define a list of exercises and their associated muscles
        $exercises = [
            ['name' => 'Bench Press', 'muscles' => 'chest,shoulders,triceps'],
            ['name' => 'Squat', 'muscles' => 'quads,hamstrings,glutes'],
            ['name' => 'Deadlift', 'muscles' => 'hamstrings,glutes,lower back'],
            ['name' => 'Pull Up', 'muscles' => 'back,biceps,shoulders'],
            ['name' => 'Push Up', 'muscles' => 'chest,triceps,shoulders'],
            ['name' => 'Lunge', 'muscles' => 'quads,hamstrings,glutes'],
            ['name' => 'Overhead Press', 'muscles' => 'shoulders,triceps,chest'],
            ['name' => 'Row', 'muscles' => 'back,biceps,shoulders'],
            ['name' => 'Leg Press', 'muscles' => 'quads,hamstrings,glutes'],
            ['name' => 'Bicep Curl', 'muscles' => 'biceps,forearms,shoulders'],
        ];

        foreach ($exercises as $exercise) {
            Exercise::create([
                'name' => $exercise['name'],
                'muscles' => $exercise['muscles'],
            ]);
        }
    }
}
