<?php

namespace App\Models;

use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Day extends Model
{
    use HasFactory;
    use SearchableTrait;

    static public $isDeletable = true;
    static public $isOrderable = true;

    protected $guarded = [];

    public function split()
    {
        return $this->belongsTo(Split::class);
    }

    public function series()
    {
        return $this->hasMany(Serie::class);
    }

    static public function search($params = [])
    {
        $query = self::query();

        $split = Split::find(data_get($params, 'split_id'));
        if (! $split || $split->user->id != Auth::id()) abort('401', 'Unauthorized');

        if ($split->id) {
            $query->where('split_id', $split->id);
        }

        $ids = data_get($params, 'ids');
        if ($ids) {
            $query->whereIn('id', explode(',', $ids));
        }

        self::process_keywords(
            $query,
            data_get($params, 'keywords', ''),
            [
                'name'
            ]
        );

        return $query->orderBy('order')->get();
    }
}
