<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Workout extends Model
{
    use HasFactory;
    use SearchableTrait;

    protected $guarded = [];

    protected static function booted()
    {
        static::addGlobalScope(new UserOwnedScope);
    }

    public function split()
    {
        return $this->belongsTo(Split::class);
    }

    static public function search($params = [])
    {
        $query = self::query()->select('workouts.*');
        $query->leftJoin('splits', 'splits.id', 'workouts.split_id');

        self::process_keywords(
            $query,
            data_get($params, 'keywords', ''),
            [
                'splits.name',
                'workouts.datetime'
            ]
        );

        $query->with('split');
        return $query->latest()->get();
    }
}
