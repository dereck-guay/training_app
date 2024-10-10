<?php

namespace App;

use \Illuminate\Database\Eloquent\Builder;

trait SearchableTrait
{
    /**
     * Process the given keywords on the specified fields.
     *
     * @param Builder $query
     * @param string $keywords
     * @param string[] $fields  // This indicates an array of strings.
     */
    public static function process_keywords(&$query, $keywords, $fields)
    {
        if (count($fields) <= 0) return $query;

        if (isset($keywords) && strlen($keywords) > 0) {
            $query->where(function ($query) use ($keywords, $fields) {
                $query->where($fields[0], 'like', "%$keywords%");

                foreach ($fields as $field)
                    $query->orWhere($field, 'like', "%$keywords%");
            });
        }
    }
}
