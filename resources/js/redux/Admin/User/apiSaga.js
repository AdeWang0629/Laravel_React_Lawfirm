import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {getCustomRequest, putCustomRequest, postCustomRequest, retriveCustomRequest, deleteCustomRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* getUsers() {
    const response = yield call(() => getCustomRequest('api/admin/users'));
    yield put({type:actions.GETUSERSSUCCESS, payload:response.data.userData});
}

function* createUser(action) {
    try{
        yield call(() => postCustomRequest('api/admin/users', action.payload));

        yield call(browserRedirect, '/users');
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* showUser(action) {
    try{
        const response = yield call(()=>retriveCustomRequest('api/admin/users',action.payload));
        yield put({type: actions.SHOWUSERSUCCESS, payload: response.data});
    
        yield call(browserRedirect, `/users/${response.data.id}`);
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* getUser(action) {
    try{
        const response = yield call(()=>retriveCustomRequest('api/admin/users',action.payload));
        yield put({type: actions.SHOWUSERSUCCESS, payload: response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* getUpdateUser(action){
    try{
        const response = yield call(()=>putCustomRequest('api/admin/users', action.id, action.payload));
        toast.success("User editing was successful.");
        yield call(browserRedirect, `/users`);
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* deleteUser(action){
    try{
        const response = yield call(()=>deleteCustomRequest('api/admin/users', action.payload));
        toast.success("User deleting was successful.");
        yield put({type:actions.GETUSERSSUCCESS, payload:response.data.userData});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETUSERS, getUsers)]);
    yield all([takeLatest(actions.CREATEUSER, createUser)]);
    yield all([takeLatest(actions.SHOWUSER, showUser)]);
    yield all([takeLatest(actions.GETUSER, getUser)]);
    yield all([takeLatest(actions.UPDATEUSER, getUpdateUser)]);
    yield all([takeLatest(actions.DELETEUSER, deleteUser)]);
}