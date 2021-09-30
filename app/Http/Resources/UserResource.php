<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'user_type' => $this->user_type,
            'gocode' => $this->go_code,
            'ready_review' => $this->ready_review,
            'name' => $this->name
        ];
    }
}
