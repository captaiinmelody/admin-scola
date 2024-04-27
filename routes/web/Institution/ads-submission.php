<?php

use App\Http\Controllers\Institution\AdsSubmissionContoller;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/ads-submission', [AdsSubmissionContoller::class, 'index'])->name('ads-submission');
});