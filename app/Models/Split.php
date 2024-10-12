<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Split extends Model
{
    use HasFactory;
    use SearchableTrait;

    static public $isListable = true;
    protected $guarded = [];

    protected static function booted()
    {
        static::addGlobalScope(new UserOwnedScope);
    }

    public function days()
    {
        return $this->hasMany(Day::class);
    }

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }

    static public function search($params = [])
    {
        $query = self::query();

        self::process_keywords(
            $query,
            data_get($params, 'keywords', ''),
            ['name']
        );

        return $query->get();
    }
}
