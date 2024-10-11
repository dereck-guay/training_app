<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Split;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SplitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $splits = Split::search($request->all());

        return inertia('app/splits/index/page', compact(
            'splits',
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
            'name' => 'required',
            'description' => '',
        ]);

        $newSplit = Split::create([
            ...$validData,
            'user_id' => Auth::id()
        ]);

        return to_route('splits.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Split $split)
    {
        return inertia('app/splits/show/page', compact(
            'split',
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Split $split)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Split $split)
    {
        $validData = $request->validate([
            'name' => 'required',
            'description' => '',
        ]);

        $split->update([
            ...$validData,
            'user_id' => Auth::id()
        ]);

        return to_route('splits.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Split $split)
    {
        $split->workouts()->delete();

        $split->delete();

        return to_route('splits.index');
    }
}
