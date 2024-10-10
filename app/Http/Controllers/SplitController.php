<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Split;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Split $split)
    {
        $split->load('exercises');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Split $split)
    {
        //
    }
}
