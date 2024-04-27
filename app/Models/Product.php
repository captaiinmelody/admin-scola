<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $keyType = 'string';

    protected $fillable = [
        'product_name',
        'tagline',
        'concept',
        'overall_concept',
        'logo_url',
    ];

    public $incrementing = false;
}