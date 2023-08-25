<?php

namespace App\Repository;

use App\Models\Branch;
use App\Repository\BranchRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class BranchRepository implements BranchRepositoryInterface {

    public function index()
    {
        try {
            $branches = Branch::with('payments')->orderByDesc('id')->get();
            $trashed = Branch::onlyTrashed()->get();

            return response()->json([
                'branchesData' => $branches,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function trashed()
    {
        $trashed = Branch::onlyTrashed()->with('payments')->orderByDesc('id')->get();
        return view('admin.branches.trash', compact('trashed'));
    }

    public function store($request)
    {
        try {
            Branch::create(['name' => $request->name]);

            $branches = Branch::with('payments')->orderByDesc('id')->get();
            $trashed = Branch::onlyTrashed()->get();

            return response()->json([
                'branchesData' => $branches,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function update($request, $branch)
    {
        try {
            $branch->update(['name' => $request->name]);
            
            $branches = Branch::with('payments')->orderByDesc('id')->get();
            $trashed = Branch::onlyTrashed()->get();

            return response()->json([
                'branchesData' => $branches,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function delete($branch)
    {
        try {
            $branch->delete();
            
            $branches = Branch::with('payments')->orderByDesc('id')->get();
            $trashed = Branch::onlyTrashed()->get();

            return response()->json([
                'branchesData' => $branches,
                'trashedData' => $trashed
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function forceDelete($id)
    {
        $branch = Branch::onlyTrashed()->findOrFail($id);
        if ($branch->payments->count() > 0) {
            toast(trans('site.should_be_deleted_children_first'), 'warning');
            return back();
        }

        $branch->forceDelete();
        toast(trans('site.deleted successfully', ['attr' => trans_choice('site.branches', 0)]),'error');
        return back();
    }

    public function restore($id)
    {
        $branch = Branch::onlyTrashed()->findOrFail($id);

        $branch->restore();
        toast(trans('site.restored successfully', ['attr' => trans_choice('site.branches', 0)]),'success');
        return back();
    }
}
