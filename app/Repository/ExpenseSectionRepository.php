<?php

namespace App\Repository;

use App\Models\Branch;
use App\Models\ExpenseSection;
use App\Repository\ExpenseSectionRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class ExpenseSectionRepository implements ExpenseSectionRepositoryInterface {

    public function index()
    {
        try {
            $expense_sections = ExpenseSection::with('payments')->orderByDesc('id')->get();
            $trashed = ExpenseSection::onlyTrashed()->get();

            return response()->json([
                'expenseSectionsData' => $expense_sections,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function trashed()
    {
        $trashed = ExpenseSection::onlyTrashed()->with('payments')->orderByDesc('id')->get();
        return view('admin.expense-sections.trash', compact('trashed'));
    }

    public function store($request)
    {
        try {
            ExpenseSection::create(['name' => $request->name]);

            $expense_sections = ExpenseSection::with('payments')->orderByDesc('id')->get();
            $trashed = ExpenseSection::onlyTrashed()->get();

            return response()->json([
                'expenseSectionsData' => $expense_sections,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function update($request, $expense_section)
    {
        try {
            $expense_section->update(['name' => $request->name]);
            
            $expense_sections = ExpenseSection::with('payments')->orderByDesc('id')->get();
            $trashed = ExpenseSection::onlyTrashed()->get();

            return response()->json([
                'expenseSectionsData' => $expense_sections,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function delete($expense_section)
    {
        try {
            $expense_section->delete();
            
            $expense_sections = ExpenseSection::with('payments')->orderByDesc('id')->get();
            $trashed = ExpenseSection::onlyTrashed()->get();

            return response()->json([
                'expenseSectionsData' => $expense_sections,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function forceDelete($id)
    {
        $expense_section = ExpenseSection::onlyTrashed()->findOrFail($id);
        if ($expense_section->payments->count() > 0) {
            toast(trans('site.should_be_deleted_children_first'), 'warning');
            return back();
        }

        $expense_section->forceDelete();
        toast(trans('site.deleted successfully', ['attr' => trans_choice('site.sections', 0)]),'error');
        return back();
    }

    public function restore($id)
    {
        $expense_section = ExpenseSection::onlyTrashed()->findOrFail($id);

        $expense_section->restore();
        toast(trans('site.restored successfully', ['attr' => trans_choice('site.sections', 0)]),'success');
        return back();
    }
}
