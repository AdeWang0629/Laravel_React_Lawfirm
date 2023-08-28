<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\ClientTypeController;
use App\Http\Controllers\Api\Admin\LawsuiteController;
use App\Http\Controllers\Api\Admin\LawsuitePaperController;
use App\Http\Controllers\Api\Admin\CaseTypeController;
use App\Http\Controllers\Api\Admin\LawsuitCaseController;
use App\Http\Controllers\Api\Admin\CourtController;
use App\Http\Controllers\Api\Admin\CaseStageController;
use App\Http\Controllers\Api\Admin\CaseSessionController;
use App\Http\Controllers\Api\Admin\ConsultationController;
use App\Http\Controllers\Api\Admin\BranchController;
use App\Http\Controllers\Api\Admin\ExpenseSectionController;
use App\Http\Controllers\Api\Admin\PaymentController;

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

        //start LawsuitePaperController
        Route::resource('lawsuites-papers', LawsuitePaperController::class)->except(['create','edit']);

        //start CaseTypeController
        Route::post('case-types/{case_type}/restore', 'CaseTypeController@restore')->name('case-types.restore');
        Route::delete('case-types/{case_type}/force-delete', 'CaseTypeController@forceDelete')->name('case-types.force.delete');
        Route::get('case-types/trashed', 'CaseTypeController@trashed')->name('case-types.trashed');
        Route::resource('case-types', CaseTypeController::class)->except(['create','show','edit']);

        //start LawsuitCaseController
        Route::post('lawsuit-cases/{lawsuit_case}/restore', 'LawsuitCaseController@restore')->name('lawsuit-cases.restore');
        Route::delete('lawsuit-cases/{lawsuit_case}/force-delete', 'LawsuitCaseController@forceDelete')->name('lawsuit-cases.force.delete');
        Route::get('lawsuit-cases/trashed', 'LawsuitCaseController@trashed')->name('lawsuit-cases.trashed');
        Route::resource('lawsuit-cases', LawsuitCaseController::class)->except(['create','show','edit']);

        //start CourtController
        Route::post('courts/{court}/restore', 'CourtController@restore')->name('courts.restore');
        Route::delete('courts/{court}/force-delete', 'CourtController@forceDelete')->name('courts.force.delete');
        Route::get('courts/trashed', 'CourtController@trashed')->name('courts.trashed');
        Route::resource('courts', CourtController::class)->except(['create','show','edit']);

        //start CaseStageController
        Route::post('case-stages/{case_stage}/restore', 'CaseStageController@restore')->name('case-stages.restore');
        Route::delete('case-stages/{case_stage}/force-delete', 'CaseStageController@forceDelete')->name('case-stages.force.delete');
        Route::get('case-stages/trashed', 'CaseStageController@trashed')->name('case-stages.trashed');
        Route::resource('case-stages', CaseStageController::class)->except(['create','show','edit']);

        //start CaseSessionController
        Route::resource('case-sessions', CaseSessionController::class)->except(['create']);

        //start ConsultationController
        Route::resource('consultations', ConsultationController::class);
        Route::get('consultations/contract/{id}', 'ConsultationController@showContract')->name('show.consultation.contract');

        //start BranchController
        Route::post('branches/{branch}/restore', 'BranchController@restore')->name('branches.restore');
        Route::delete('branches/{branch}/force-delete', 'BranchController@forceDelete')->name('branches.force.delete');
        Route::get('branches/trashed', 'BranchController@trashed')->name('branches.trashed');
        Route::resource('branches', BranchController::class)->except(['create','show','edit']);

        //start ExpenseSectionController
        Route::post('expense-sections/{expense_section}/restore', 'ExpenseSectionController@restore')->name('expense-sections.restore');
        Route::delete('expense-sections/{expense_section}/force-delete', 'ExpenseSectionController@forceDelete')->name('expense-sections.force.delete');
        Route::get('expense-sections/trashed', 'ExpenseSectionController@trashed')->name('expense-sections.trashed');
        Route::resource('expense-sections', ExpenseSectionController::class)->except(['create','show','edit']);

        //start PaymentController
        Route::resource('payments', PaymentController::class)->except(['create','show','edit']);
        Route::get('payments/receipt/{id}', 'PaymentController@showReceipt')->name('get.payment.receipt');
        });
});