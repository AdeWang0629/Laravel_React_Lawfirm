<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawsuiteNumber extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function lawsuite()
    {
        return $this->belongsTo(Lawsuite::class);
    }
}
