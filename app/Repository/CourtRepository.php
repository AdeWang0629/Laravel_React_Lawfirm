<?php

namespace App\Repository;

use App\Models\Court;
use App\Repository\CourtRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class CourtRepository implements CourtRepositoryInterface {

    public function index()
    {
        try {
            $courts = Court::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = Court::onlyTrashed()->get();

            return response()->json([
                'courtsData' => $courts,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function trashed()
    {
        $trashed = Court::onlyTrashed()->withCount('lawsuites')->orderByDesc('id')->get();
        return view('admin.courts.trash', compact('trashed'));
    }


    public function store($request)
    {
        try {
            Court::create(['name' => $request->name]);

            $courts = Court::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = Court::onlyTrashed()->get();

            return response()->json([
                'courtsData' => $courts,
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
            $courts = Court::findOrFail($id);
            $courts->update(['name' => $request->name]);
            
            $courts = Court::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = Court::onlyTrashed()->get();

            return response()->json([
                'courtsData' => $courts,
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
            $court = Court::findOrFail($id);
            $court->delete();
            
            $courts = Court::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = Court::onlyTrashed()->get();

            return response()->json([
                'courtsData' => $courts,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function forceDelete($id)
    {
        $court = Court::onlyTrashed()->findOrFail($id);

        if ($court->lawsuites->count() > 0 || $court->caseSessions->count() > 0) {
            toast(trans('site.should_be_deleted_children_first'), 'warning');
            return back();
        }

        $court->forceDelete();
        toast(trans('site.deleted successfully', ['attr' => trans_choice('site.courts', 0)]),'success');
        return back();
    }

    public function restore($id)
    {
        $court = Court::onlyTrashed()->findOrFail($id);

        $court->restore();
        toast(trans('site.restored successfully', ['attr' => trans_choice('site.courts', 0)]),'success');
        return back();
    }
}
