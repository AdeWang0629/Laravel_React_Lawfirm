<?php

namespace App\Repository;

use App\Models\Branch;
use App\Models\ClientAccount;
use App\Models\ExpenseSection;
use App\Models\FundAccount;
use App\Models\Payment;
use App\Repository\PaymentRepositoryInterface;
use Illuminate\Support\Facades\DB;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Stevebauman\Purify\Facades\Purify;

class PaymentRepository implements PaymentRepositoryInterface {
    public function index()
    {
        try {
            $payments = Payment::with('branch', 'expenseSection')->get();
            $expenseSections = ExpenseSection::get();
            $branches = Branch::get();

            return response()->json([
                'paymentsData' => $payments,
                'expenseSectionsData' => $expenseSections,
                'branchesData' => $branches
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {
            $payment = Payment::create([
                'receiver'              => $request->receiver,
                'voucher_number'        => voucherNumber(),
                'base_encode'           => base64_encode(lawsuiteCaseNumber().\Illuminate\Support\Str::random(40)),
                'date'                  => $request->date,
                'payment_type'          => $request->payment_type,
                'expense_section_id'    => $request->expense_section_id,
                'branch_id'             => $request->branch_id,
                'debit'                 => $request->debit,
                'note'                  => $request->note,
            ]);

            FundAccount::create([
                'date'                  => $request->date,
                'payment_id'            => $payment->id,
                'debit'                 => 0.00,
                'credit'                => $request->debit,
                'note'                  => $request->note,
            ]);

            DB::commit();
            
            $payments = Payment::with('branch', 'expenseSection')->get();
            $expenseSections = ExpenseSection::get();
            $branches = Branch::get();

            return response()->json([
                'paymentsData' => $payments,
                'expenseSectionsData' => $expenseSections,
                'branchesData' => $branches
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function update($request, $payment)
    {
        DB::beginTransaction();
        try {
            $payment->update([
                'receiver'              => $request->receiver,
                'date'                  => $request->date,
                'payment_type'          => $request->payment_type,
                'expense_section_id'    => $request->expense_section_id,
                'branch_id'             => $request->branch_id,
                'debit'                 => $request->debit,
                'note'                  => $request->note,
            ]);

            FundAccount::where('payment_id', $payment->id)->update([
                'date'                  => $request->date,
                'payment_id'            => $payment->id,
                'credit'                => $request->debit,
                'note'                  => $request->note,
            ]);

            DB::commit();
            
            $payments = Payment::with('branch', 'expenseSection')->get();
            $expenseSections = ExpenseSection::get();
            $branches = Branch::get();

            return response()->json([
                'paymentsData' => $payments,
                'expenseSectionsData' => $expenseSections,
                'branchesData' => $branches
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function delete($payment)
    {
        try {
            $payment->delete();

            $payments = Payment::with('branch', 'expenseSection')->get();
            $expenseSections = ExpenseSection::get();
            $branches = Branch::get();

            return response()->json([
                'paymentsData' => $payments,
                'expenseSectionsData' => $expenseSections,
                'branchesData' => $branches
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function showReceipt($id)
    {
        $payment = Payment::where('id', $id)->with(['branch', 'expenseSection'])->first();
        $qr_code = QrCode::generate(route('admin.show.qr.payment.receipt', $payment->base_encode));
        return view('layouts.admin.payment_voucher', compact('payment', 'qr_code'));
    }

    public function qrReceipt($base_encode)
    {
        $payment = Payment::where('base_encode', $base_encode)->with(['branch', 'expenseSection'])->first();
        $qr_code = QrCode::generate(route('admin.show.qr.payment.receipt', $payment->base_encode));
        return view('layouts.admin.qr_payment_voucher', compact('payment', 'qr_code'));
    }
}
