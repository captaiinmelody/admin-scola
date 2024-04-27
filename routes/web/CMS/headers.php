<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CMS\HeaderController;


/*
|--------------------------------------------------------------------------
| Web Routes
|-------------------------------------------------------------------------- */

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/web/headers', [HeaderController::class, 'index'])->name('headers.index');

    Route::get('/web/headers/create', [HeaderController::class, 'create'])->name('headers.create');
    Route::post('/web/headers', [HeaderController::class, 'store'])->name('headers.store');

    Route::get('/web/headers/{header}/edit', [HeaderController::class, 'edit'])->name('headers.edit');
    Route::put('/web/headers/{header}', [HeaderController::class, 'update'])->name('headers.update');

    Route::delete('/web/headers/{header}', [HeaderController::class, 'destroy'])->name('headers.destroy');
});