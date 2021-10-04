<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GoCodes extends Model
{
    protected $table = 'go_codes';
    protected $fillable = [
        'code',
    ];
}
