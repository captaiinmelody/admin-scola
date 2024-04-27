<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    use HasFactory;

    protected $fillable = ['id' => 'string', 'label', 'route', 'parent_label'];

    public function children()
    {
        return $this->hasMany(Header::class, 'parent_label', 'label');
    }
}