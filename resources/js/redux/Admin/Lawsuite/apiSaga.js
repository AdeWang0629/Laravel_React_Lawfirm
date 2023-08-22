import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {getCustomRequest, putCustomRequest, postCustomRequest, retriveCustomRequest, deleteCustomRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* getCreateLawsuites() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/lawsuites/create'));
        yield put({type:actions.GETCREATELAWSUITESSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* createLawsuites(action) {
    try{
        yield call(() => postCustomRequest('api/admin/lawsuites', action.payload));
        toast.success("Lawsuite created was successful.");
        yield call(browserRedirect, `/lawsuites`);
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* getPapers() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/lawsuites-papers'));
        yield put({type:actions.GETPAPERSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETCREATELAWSUITES, getCreateLawsuites)]);
    yield all([takeLatest(actions.CREATELAWSUITES, createLawsuites)]);
    yield all([takeLatest(actions.GETPAPERS, getPapers)]);
}