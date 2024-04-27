<?php

use App\Http\Controllers\Feeds\FeedController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/feeds', [FeedController::class, 'index'])->name('feeds.index');
    Route::get('/feeds/sekolah', [FeedController::class, 'getSekolahData'])->name('feeds.sekolah');
    Route::get('/feeds/prodi', [FeedController::class, 'getProgramStudiData'])->name('feeds.prodi');
    Route::post('/feeds', [FeedController::class, 'store'])->name('feeds.store');
    Route::get('/feeds/{id}', [FeedController::class, 'show'])->name('feeds.show');
    Route::put('/feeds/{id}', [FeedController::class, 'update'])->name('feeds.update');
    Route::delete('/feeds/{id}', [FeedController::class, 'destroy'])->name('feeds.destroy');
});