<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\ClientTypeController;
use App\Http\Controllers\Api\Admin\LawsuiteController;

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

Route::post('/login', [App\Http\Controllers\Api\Auth\AuthController::class,'authenticate']);
Route::post('/register', [App\Http\Controllers\Api\Auth\AuthController::class,'register']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/auth/user', function (Request $request) {
        return ['data' => $request->user()];
    });
});

Route::group(['middleware' => 'jwt_auth'], function() {
    Route::get('/hello',function(){
        return "Cool dude";
    });
    Route::delete('/logout', [App\Http\Controllers\Api\Auth\AuthController::class,'logout']);


    Route::name('admin.')->prefix('admin/')->group(function () {
        Route::get('home', [App\Http\Controllers\Api\Admin\AdminController::class,'index'])->name('home');

        //start RoleController && UserController
        Route::apiResource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);

        //start ClientTypeController
        Route::post('clients-types/{client_type}/restore', 'ClientTypeController@restore')->name('clients-types.restore');
        Route::delete('clients-types/{client_type}/force-delete', 'ClientTypeController@forceDelete')->name('clients-types.force.delete');
        Route::get('clients-types/trashed', 'ClientTypeController@trashed')->name('clients-types.trashed');
        Route::apiResource('clients-types', ClientTypeController::class)->except(['create','show','edit']);

        //start LawsuiteController
        Route::resource('lawsuites', LawsuiteController::class);
        Route::get('lawsuites-status/{id}', 'LawsuiteController@lawsuitesStatus')->name('lawsuites.status');
        Route::get('lawsuites/contract/{id}', 'LawsuiteController@showContract')->name('show.contract');
        Route::match(['put','patch'],'lawsuites/judgment-update/{lawsuite}', 'LawsuiteController@judgmentUpdate')->name('lawsuites.judgment.update');
    });
});