<?php

namespace App\Models;

use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    use SearchableTrait;

    static public bool $isListable = true;

    public $timestamps = false;

    protected $guarded = [];

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
