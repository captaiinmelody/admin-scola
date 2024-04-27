<?php

namespace App\Models\Feeds;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedGallery extends Model
{
    use HasFactory;

    protected $table = 'feed_gallery';
    protected $fillable = [
        'id_feed',
        'id_feed_gallery',
        'url',
    ];
}