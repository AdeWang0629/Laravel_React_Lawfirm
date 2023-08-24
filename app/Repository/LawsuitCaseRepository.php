<?php

namespace App\Repository;

use App\Models\LawsuitCase;
use App\Repository\LawsuitCaseRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class LawsuitCaseRepository implements LawsuitCaseRepositoryInterface {

    public function index()
    {
        try {
            $lawsuitCases = LawsuitCase::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = LawsuitCase::onlyTrashed()->get();

            return response()->json([
                'lawsuitCasesData' => $lawsuitCases,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function trashed()
    {
        $trashed = LawsuitCase::onlyTrashed()->withCount('lawsuites')->orderByDesc('id')->get();
        return view('admin.lawsuits-cases.trash', compact('trashed'));
    }

    public function store($request)
    {
        try {
            LawsuitCase::create([
                'name' => $request->name,
                'color' => $request->color,
            ]);
            
            $lawsuitCases = LawsuitCase::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = LawsuitCase::onlyTrashed()->get();

            return response()->json([
                'lawsuitCasesData' => $lawsuitCases,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function update($request, $id)
    {
        try {
            $lawsuitCase = LawsuitCase::findOrFail($id);
            $lawsuitCase->update([
                'name' => $request->name,
                'color' => $request->color,
            ]);
            
            $lawsuitCases = LawsuitCase::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = LawsuitCase::onlyTrashed()->get();

            return response()->json([
                'lawsuitCasesData' => $lawsuitCases,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $lawsuitCase = LawsuitCase::findOrFail($id);
            $lawsuitCase->delete();
            
            $lawsuitCases = LawsuitCase::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = LawsuitCase::onlyTrashed()->get();

            return response()->json([
                'lawsuitCasesData' => $lawsuitCases,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function forceDelete($id)
    {
        $lawsuitCase = LawsuitCase::onlyTrashed()->findOrFail($id);

        if ($lawsuitCase->lawsuites->count() > 0) {
            toast(trans('site.should_be_deleted_children_first'), 'warning');
            return back();
        }

        $lawsuitCase->forceDelete();
        toast(trans('site.deleted successfully', ['attr' => trans_choice('site.status', 0) .' '. trans_choice('site.lawsuites', 0)]),'success');
        return back();
    }

    public function restore($id)
    {
        $lawsuitCase = LawsuitCase::onlyTrashed()->findOrFail($id);

        $lawsuitCase->restore();
        toast(trans('site.restored successfully', ['attr' => trans_choice('site.status', 0) .' '. trans_choice('site.lawsuites', 0)]),'success');
        return back();
    }
}
