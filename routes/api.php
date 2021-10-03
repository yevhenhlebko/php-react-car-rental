<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('api.')->namespace('Api')->group(function () {
    // Unprotected routes
    Route::group(['middleware' => 'guest:api'], function () {
        Route::namespace('Auth')->group(function () {
            Route::post('login', 'LoginController')->name('login');
            Route::post('register', 'RegisterController')->name('register');

          // Password Reset Routes...
            Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail');
            Route::post('password/reset', 'ResetPasswordController@reset');
        });
    });

    // Protected routes
    Route::middleware('auth:api')->group(function () {
        Route::namespace('Auth')->group(function () {
            Route::get('me', 'MeController@me')->name('me');
            Route::get('getUsers', 'MeController@getUsers')->name('getUsers');
            Route::post('logout', 'LogoutController@logout')->name('logout');
            Route::post('application', 'RegisterController@application')->name('application');
            Route::post('setUserAction', 'MeController@setUserAction')->name('setuseraction');
        });

        Route::get('disabled-cars', 'AvailabilityController@getDisabledCars')->name('getDisabledCars');
        Route::get('confirm-reservation', 'AvailabilityController@confirmReservation')->name('confirmReservation');
        Route::get('reservations', 'ReservationController@getAllReservations')->name('getAllReservations');
        Route::post('accept-reservation', 'ReservationController@acceptReservation')->name('acceptReservation');
        Route::post('decline-reservation', 'ReservationController@declineReservation')->name('declineReservation');
    });
});
