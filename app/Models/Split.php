<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Split extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::addGlobalScope(new UserOwnedScope);
    }

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }

    static public function search($params = [])
    {
        $query = self::query();

        return $query->get();
    }
}
