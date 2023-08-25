import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {getCustomRequest, putCustomRequest, postCustomRequest, retriveCustomRequest, deleteCustomRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* getBranches() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/branches'));
        console.log(response.data);
        yield put({type:actions.GETBRANCHESSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* createBranches(action) {
    try{
        yield call(() => postCustomRequest('api/admin/branches', action.payload));
        toast.success("Branches Creating was successful.");
        yield put({type:actions.GETBRANCHESSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* updateBranches(action) {
    try{
        const response = yield call(() => putCustomRequest('api/admin/branches', action.id, action.payload));
        toast.success("Branches Updating was successful.");
        yield put({type:actions.GETBRANCHESSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* deleteBranches(action) {
    try{
        const response = yield call(() => deleteCustomRequest('api/admin/branches', action.payload));
        toast.success("Branches deleting was successful.");
        yield put({type:actions.GETBRANCHESSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETBRANCHES, getBranches)]);
    yield all([takeLatest(actions.CREATEBRANCHES, createBranches)]);
    yield all([takeLatest(actions.UPDATEBRANCHES, updateBranches)]);
    yield all([takeLatest(actions.DELETEBRANCHES, deleteBranches)]);
}