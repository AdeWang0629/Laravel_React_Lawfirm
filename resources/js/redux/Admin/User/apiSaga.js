import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getCustomRequest, getRequest, deleteRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';

function* getUser() {
    const response = yield call(() => getCustomRequest('api/admin/users'));
    console.log(response.data.userData);
    yield put({type:actions.GETUSERSUCCESS, payload:response.data.userData});
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETUSER, getUser)]);
}