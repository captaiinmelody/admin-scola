<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Institution\VerificationSubmissionController;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/verification-submission', [VerificationSubmissionController::class, 'index'])->name('verification-submission');
});