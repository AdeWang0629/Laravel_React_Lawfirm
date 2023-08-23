<?php

namespace App\Repository;

use App\Models\CaseType;
use App\Repository\CaseTypeRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class CaseTypeRepository implements CaseTypeRepositoryInterface {

    public function index()
    {

        try {
            $caseTypes = CaseType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = CaseType::onlyTrashed()->get();

            return response()->json(['caseTypesData' => $caseTypes, 'trashedData' => $trashed], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function trashed()
    {
        $trashed = CaseType::onlyTrashed()->withCount('lawsuites')->orderByDesc('id')->get();
        return view('admin.cases-types.trash', compact('trashed'));
    }

    public function store($request)
    {
        try {
            CaseType::create(['name' => $request->name]);
            
            $caseTypes = CaseType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = CaseType::onlyTrashed()->get();

            return response()->json(['caseTypesData' => $caseTypes, 'trashedData' => $trashed], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function update($request, $id)
    {
        try {
            $caseType = CaseType::findOrFail($id);
            $caseType->update(['name' => $request->name]);
            
            $caseTypes = CaseType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = CaseType::onlyTrashed()->get();

            return response()->json(['caseTypesData' => $caseTypes, 'trashedData' => $trashed], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $caseType = CaseType::findOrFail($id);
            $caseType->delete();
            
            $caseTypes = CaseType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = CaseType::onlyTrashed()->get();

            return response()->json(['caseTypesData' => $caseTypes, 'trashedData' => $trashed], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function forceDelete($id)
    {
        $caseType = CaseType::onlyTrashed()->findOrFail($id);
        if ($caseType->lawsuites->count() > 0) {
            toast(trans('site.should_be_deleted_children_first'), 'warning');
            return back();
        }

        $caseType->forceDelete();
        toast(trans('site.deleted successfully', ['attr' => removebeginninLetters(trans_choice('site.categories', 0), 2) .' '. trans_choice('site.lawsuites', 0)]),'success');
        return back();
    }

    public function restore($id)
    {
        $caseType = CaseType::onlyTrashed()->findOrFail($id);

        $caseType->restore();
        toast(trans('site.restored successfully', ['attr' => removebeginninLetters(trans_choice('site.categories', 0), 2) .' '. trans_choice('site.lawsuites', 0)]),'success');
        return back();
    }
}
