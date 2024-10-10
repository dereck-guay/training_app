<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;

class GenericResponseDTO
{
    public bool $success;
    public Collection $data;
    public ?string $message;

    /**
     * Create a successful response with data.
     *
     * @param Collection $data
     * @return self
     */
    public static function success(Collection $data): string
    {
        $response = new self();
        $response->success = true;
        $response->data = $data;
        $response->message = null; // No error message for a successful response
        return json_encode($response);
    }

    /**
     * Create a failed response with an optional message.
     *
     * @param string|null $message
     * @return self
     */
    public static function failure(?string $message = null): string
    {
        $response = new self();
        $response->success = false;
        $response->data = null;
        $response->message = $message;
        return json_encode($response);
    }
}
