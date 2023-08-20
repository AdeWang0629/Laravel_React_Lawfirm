<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Repository\UserRepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public $userRep;
    public function __construct(UserRepositoryInterface $userRep) {
        $this->userRep = $userRep;
        // $this->middleware('permission:users_list|users_create|users_edit|users_delete', ['only' => ['index']]);
        // $this->middleware('permission:users_show', ['only' => ['show']]);
        // $this->middleware('permission:users_create', ['only' => ['create','store']]);
        // $this->middleware('permission:users_edit', ['only' => ['edit','update']]);
        // $this->middleware('permission:users_delete', ['only' => ['destroy']]);
    }
    
    public function index()
    {
        return $this->userRep->index();
    }

    public function store(UserRequest $request)
    {
        return $this->userRep->store($request);
    }

    public function show(Request $request, $id)
    {
        return $this->userRep->show($id);
    }

    public function edit(User $user)
    {
        return $this->userRep->edit($user);
    }

    public function update(Request $request, $id)
    {
        return $this->userRep->update($request, $id);
    }

    public function destroy($id)
    {
        return $this->userRep->destroy($id);
    }
}
