<?php

namespace App\Http\Controllers;

use App\GenericResponseDTO;
use Illuminate\Http\Request;

class GenericController extends Controller
{
    public function list(Request $request, $entity)
    {
        $className = "\App\Models\\$entity";

        if (! property_exists($className, 'isListable')) {
            return GenericResponseDTO::failure("$entity is not listable.");
        }

        $records = $className::search($request->all());

        return GenericResponseDTO::success($records);
    }
}
