<?php

namespace App\Models;

use App\Models\Scopes\UserOwnedScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Workout extends Model
{
    use HasFactory;

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
        $query = self::query();

        $query->with('split');

        return $query->get();
    }
}
