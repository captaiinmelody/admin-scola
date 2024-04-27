<?php

use App\Http\Controllers\Compro\ComproController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/compro', [ComproController::class, 'index'])->name('compro');
});