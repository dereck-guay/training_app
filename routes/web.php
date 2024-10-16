<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DayController;
use App\Http\Controllers\SplitController;
use App\Http\Controllers\WorkoutController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenericController;
use App\Models\Workout;

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

    Route::group(['prefix' => 'days'], function () {
        Route::post('/', [DayController::class, 'store'])->name('days.store');
        Route::put('/{day}', [DayController::class, 'update'])->name('days.update');
    });
});

Route::group([
    'prefix' => 'ajax',
    'middleware' => ['auth', 'verified']
], function () {
    Route::get('/listable/{entity}', [GenericController::class, 'list'])->name('generic.list');
    Route::post('/savable/{entity}', [GenericController::class, 'save'])->name('generic.save');
    Route::post('/orderable/{entity}', [GenericController::class, 'order'])->name('generic.order');
    Route::delete('/deletable/{entity}', [GenericController::class, 'delete'])->name('generic.delete');
});

require __DIR__ . '/auth.php';
