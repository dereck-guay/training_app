<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SplitController;
use App\Http\Controllers\WorkoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('dashboard');
});

Route::group([
    'prefix' => 'app',
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('workouts', WorkoutController::class);
    Route::resource('splits', SplitController::class);
});

require __DIR__ . '/auth.php';
