<?php

namespace App\Models\Feeds;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class Feed extends Model
{
    use HasFactory;

    protected $table = 'feed';

    protected $fillable = [
        'id_feed',
        'id_user',
        'id_sekolah',
        'id_prodi',
        'nama',
        'jenis',
        'keterangan',
        'cp',
        'mulai_tayang',
        'selesai_tayang',
        'url_media',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id_feed = Uuid::uuid4()->toString();
        });
    }

    public function feedsGallery(): HasMany
    {
        return $this->hasMany(FeedGallery::class, 'id_feed', 'id_feed');
    }
}