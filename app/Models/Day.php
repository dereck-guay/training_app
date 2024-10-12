<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    use HasFactory;

    public function split()
    {
        return $this->belongsTo(Split::class);
    }

    public function series()
    {
        return $this->hasMany(Serie::class);
    }
}
