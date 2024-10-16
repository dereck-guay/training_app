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

    public function delete(Request $request, $entity)
    {
        $className = "\App\Models\\$entity";

        if (! property_exists($className, 'isDeletable')) {
            return GenericResponseDTO::failure("$entity is not deletable.");
        }

        $records = $className::search($request->all());
        $records->each(fn($record) => $record->delete());

        return back();
    }

    public function order(Request $request, $entity)
    {
        $className = "\App\Models\\$entity";

        if (! property_exists($className, 'isOrderable')) {
            return GenericResponseDTO::failure("$entity is not orderable.");
        }

        $records = $className::search($request->all());
        $ids = explode(',', $request->get('ids'));

        foreach ($ids as $order => $id) {
            $record = $records->find($id);
            if (! $record) continue;

            $record->order = $order;
            $record->save();
        }

        return back();
    }
}
