<?php

namespace App\Http\Controllers;

use App\Models\Serie;
use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    public function index(Request $request)
    {
        $workouts = Workout::search($request->all());

        return inertia('app/workouts/index/page', compact(
            'workouts'
        ));
    }

    public function store(Request $request)
    {
        $validData = $request->validate([
            'datetime' => 'required|date',
            'split_id' => 'numeric|nullable',
            'calories' => 'numeric|nullable',
            'time' => 'numeric|nullable',
        ]);

        $request->user()->workouts()->create($validData);

        return to_route('workouts.index');
    }

    public function show(Workout $workout)
    {
        $split = $workout->split;
        $series = Serie::search([
            'workout_id' => $workout->id,
        ]);

        return inertia('app/workouts/show/page', compact(
            'workout',
            'split',
            'series'
        ));
    }

    public function update(Request $request, Workout $workout)
    {
        $validData = $request->validate([
            'datetime' => 'required|date',
            'split_id' => 'numeric|nullable',
            'calories' => 'numeric|nullable',
            'time' => 'numeric|nullable',
        ]);

        $workout->update($validData);

        return to_route('workouts.index');
    }

    public function destroy(Workout $workout)
    {
        $workout->delete();

        return to_route('workouts.index');
    }
}
