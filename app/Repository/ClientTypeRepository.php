<?php

namespace App\Repository;

use App\Models\ClientType;
use App\Repository\ClientTypeRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Stevebauman\Purify\Facades\Purify;

class ClientTypeRepository implements ClientTypeRepositoryInterface {

    public function index()
    {
        $clientTypes = ClientType::withCount('lawsuites')->orderByDesc('id')->get();
        $trashed = ClientType::onlyTrashed()->get();
        return response()->json([
            'clientTypes'  => $clientTypes,
            'trashed' => $trashed,
        ],200);
    }

    public function trashed()
    {
        $trashed = ClientType::onlyTrashed()->withCount('lawsuites')->orderByDesc('id')->get();
        return view('admin.clients-types.trash', compact('trashed'));
    }

    public function store($request)
    {
        try {
            ClientType::create(['name' => $request->name]);
            // return response()->json('success', 200);
            
            $clientTypes = ClientType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = ClientType::onlyTrashed()->get();
            return response()->json([
                'clientTypes'  => $clientTypes,
                'trashed' => $trashed,
            ],200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json('error', $e->getMessage());
        }
    }

    public function update($request, $id)
    {
        try {
            $clientType = ClientType::findOrFail($id);
            $clientType->update(['name' => $request->name]);
            
            $clientTypes = ClientType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = ClientType::onlyTrashed()->get();
            return response()->json([
                'clientTypes'  => $clientTypes,
                'trashed' => $trashed,
            ],200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json('error', $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $clientType = ClientType::findOrFail($id);
    
            $clientType->delete();
            // return response()->json('success', 200);
            
            $clientTypes = ClientType::withCount('lawsuites')->orderByDesc('id')->get();
            $trashed = ClientType::onlyTrashed()->get();
            return response()->json([
                'clientTypes'  => $clientTypes,
                'trashed' => $trashed,
            ],200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json('error', $e->getMessage());
        }
    }

    public function forceDelete($id)
    {
        $clientType = ClientType::onlyTrashed()->findOrFail($id);
        if ($clientType->lawsuites->count() > 0) {
            toast(trans('site.should_be_deleted_children_first'), 'warning');
            return back();
        }

        $clientType->forceDelete();
        toast(trans('site.deleted successfully', ['attr' => removebeginninLetters(trans_choice('site.categories', 0), 2) .' '. trans_choice('site.clients', 0)]),'error');
        return back();
    }

    public function restore($id)
    {
        $clientType = ClientType::onlyTrashed()->findOrFail($id);

        $clientType->restore();
        toast(trans('site.restored successfully', ['attr' => removebeginninLetters(trans_choice('site.categories', 0), 2) .' '. trans_choice('site.clients', 0)]),'success');
        return back();
    }
}
