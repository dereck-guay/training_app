<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $workouts = Workout::search($request->all());

        return inertia('app/workouts/index/page', compact(
            'workouts'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(Workout $workout)
    {
        $workout->load('split');

        return inertia('app/workouts/show/page', compact(
            'workout',
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workout $workout)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workout $workout)
    {
        $workout->delete();

        return to_route('workouts.index');
    }
}
