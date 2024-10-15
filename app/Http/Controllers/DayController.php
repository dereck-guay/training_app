<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Split;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DayController extends Controller
{
    public function store(Request $request)
    {
        $split = Split::findOrFail($request->get('split_id'));

        if ($split->user->id != Auth::id()) {
            abort('401', 'Unauthorized');
        }

        $validData = $request->validate([
            'split_id' => 'required|numeric',
            'name' => 'required|max:50',
        ]);

        $lastDayOrder = $split->days()->count();

        $split->days()->create([
            ...$validData,
            'order' => $lastDayOrder
        ]);

        return back();
    }

    public function update(Request $request, Day $day)
    {
        $split = Split::findOrFail($request->get('split_id'));

        if ($split->user->id != Auth::id()) {
            abort('401', 'Unauthorized');
        }

        $validData = $request->validate([
            'split_id' => 'required|numeric',
            'name' => 'required|max:50'
        ]);

        $day->update($validData);

        return back();
    }
}
