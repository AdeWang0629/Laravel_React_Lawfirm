<?php

namespace App\Repository;

use App\Models\User;
use App\Repository\UserRepositoryInterface;
use Spatie\Permission\Models\Role;
use Stevebauman\Purify\Facades\Purify;

class UserRepository implements UserRepositoryInterface {
    public function index()
    {
        $users = User::with('roles')->whereHas('roles', function($q) {
            if (auth()->user()->hasRole('Admin')) {
                return $q;
            }else {
                return $q->where('name','!=','Admin');
            }
        })->where('id', '!=', auth()->id())->orderBy('id', 'desc')->get();

        return response()->json(['userData'=>$users],200);
    }

    public function store($request)
    {
        try {
            $data['first_name'] = $request->first_name;
            $data['last_name'] = $request->last_name;
            $data['user_name'] = $request->user_name;
            $data['email'] = $request->email;
            $data['status'] = $request->status;
            if ($request->password && $request->password != null) {
                $data['password'] = bcrypt($request->password);
            }

            $user = User::create($data);
            $user->syncRoles($request->roles_id);

            return response()->json('success', 200);
        } catch (\Exception $e) {
            return redirect()->json(['error' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        $user = User::with('roles')->find($id);

        return response()->json($user);
    }

    public function edit($user)
    {
        if (auth()->user()->hasRole('Admin')) {
            $roles = Role::pluck('name','id')->toArray();
        }else {
            $roles = Role::where('name','!=','Admin')->pluck('name','id')->toArray();
        }
        return view('admin.users.edit', compact('user', 'roles'));
    }

    public function update($request, $id)
    {
        try {
            $data = $request->only('first_name','last_name','user_name','email','status');
            if ($request->password && $request->password != null) {
                $data['password'] = bcrypt($request->password);
            }

            $user = User::find($id);
            $user->update($data);
            $user->syncRoles($request->roles_id);

            return response()->json('success', 200);
        } catch (\Exception $e) {
            return redirect()->json(['error' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try{
            $user = User::find($id);
            $user->delete();
            
            $users = User::with('roles')->whereHas('roles', function($q) {
                if (auth()->user()->hasRole('Admin')) {
                    return $q;
                }else {
                    return $q->where('name','!=','Admin');
                }
            })->where('id', '!=', auth()->id())->orderBy('id', 'desc')->get();
    
            return response()->json(['userData'=>$users], 200);
        } catch (\Exception $e) {
            return redirect()->json(['error' => $e->getMessage()]);
        }
    }
}
