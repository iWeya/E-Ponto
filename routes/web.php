<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['guest']], function () {
    Route::view('/authorize', 'auth.authorize');
    Route::post('/login', 'Auth\ClientAuthorizationController')->name('login');
});

Route::group(['middleware' => ['auth']], function () {
    Route::post('/logout', 'Auth\ClientLogoutController')->name('logout');

    Route::get('/dashboard', 'DashboardController')->name('dashboard');

    Route::resource('punch-in-logs', 'PunchInLogController')->except([
        'edit', 'update', 'destroy'
    ]);

    Route::resource('punch-in-logs', 'PunchInLogController')
        ->only(['edit', 'update', 'destroy'])
        ->middleware('ProtectConfirmedPunchInLogFromEditing');
});


Route::redirect('/home', 'dashboard');
