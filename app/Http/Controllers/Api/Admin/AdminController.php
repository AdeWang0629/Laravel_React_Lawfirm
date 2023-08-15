<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CaseSession;
use App\Models\Client;
use App\Models\Consultation;
use App\Models\Lawsuite;
use App\Models\Receipt;

class AdminController extends Controller
{
    public function index()
    {
        $data = [
            'lawsuites' => Lawsuite::with('client')->with('caseType')->with('court')->orderBy('contract_date', 'desc')->get()->take(6),
            'lawsuitesCount' => Lawsuite::count(),
            'consultationsCount' => Consultation::count(),
            'clientsCount' => Client::count(),
            'caseSessionCount' => CaseSession::count(),
            'receipts' => Receipt::orderBy('date', 'desc')->get(['title','debit', 'lawsuite_id', 'consultation_id'])->take(6),
            'lawsuitesPayments' => Receipt::whereNull('consultation_id')->sum('debit'),
            'consultationPayments' => Receipt::whereNull('lawsuite_id')->sum('debit'),
        ];

        return response()->json($data,200);
    }
}
