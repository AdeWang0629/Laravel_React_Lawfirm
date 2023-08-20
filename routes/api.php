<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\RoleController;

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

        Route::apiResource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);
    });
    Route::get('/hi',function(){
        return "Hi, My name is Tony";
    });
});