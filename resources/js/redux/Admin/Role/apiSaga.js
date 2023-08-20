import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {getCustomRequest, putCustomRequest, postCustomRequest, retriveCustomRequest, deleteCustomRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* getRoles() {
    const response = yield call(() => getCustomRequest('api/admin/roles'));
    yield put({type:actions.GETROLESSUCCESS, payload:response.data.roleData});
}

function* getPermission() {
    const response = yield call(() => getCustomRequest('api/admin/roles/create'));
    yield put({type:actions.GETPERMISSIONSUCCESS, payload:response.data.permissionData});
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETROLES, getRoles)]);
    yield all([takeLatest(actions.GETPERMISSION, getPermission)]);
}