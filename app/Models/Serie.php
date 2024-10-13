<?php

namespace App\Models;

use App\SearchableTrait;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Response;

class Serie extends Model
{
    use HasFactory;
    use SearchableTrait;

    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    public function day()
    {
        return $this->belongsTo(Day::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }

    public function sets()
    {
        return $this->hasMany(Set::class);
    }

    static public function search($params = [])
    {
        $query = self::query();

        $workoutId = data_get($params, 'workout_id');
        $dayId = data_get($params, 'workout_id');

        if (! $workoutId && ! $dayId) abort('401', 'Unauthorized');

        if ($workoutId) {
            $query->where('workout_id', $workoutId);
        }

        if ($dayId) {
            $query->where('workout_id', $workoutId);
        }

        return $query->get();
    }
}
