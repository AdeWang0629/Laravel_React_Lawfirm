import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {postRequest, getCustomRequest, getRequest, deleteRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';

function* getHome() {
    const response = yield call(() => getCustomRequest('api/admin/home'));
    yield put({type:actions.GETHOMESUCCESS, payload:response.data});
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETHOME, getHome)]);
}