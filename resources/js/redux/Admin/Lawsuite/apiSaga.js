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

function* getAllLawsuites() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/lawsuites'));
        yield put({type:actions.GETALLLAWSUITESSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* getCaseTypes() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/case-types'));
        yield put({type:actions.GETCASETYPESSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* createCaseTypes(action) {
    try{
        const response = yield call(() => postCustomRequest('api/admin/case-types', action.payload));
        toast.success("Category Creating was successful.");
        yield put({type:actions.GETCASETYPESSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* updateCaseTypes(action) {
    try{
        const response = yield call(() => putCustomRequest('api/admin/case-types', action.id, action.payload));
        toast.success("Category Updating was successful.");
        yield put({type:actions.GETCASETYPESSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* deleteCaseTypes(action) {
    try{
        const response = yield call(() => deleteCustomRequest('api/admin/case-types', action.payload));
        toast.success("Category deleting was successful.");
        yield put({type:actions.GETCASETYPESSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETCREATELAWSUITES, getCreateLawsuites)]);
    yield all([takeLatest(actions.CREATELAWSUITES, createLawsuites)]);
    yield all([takeLatest(actions.GETPAPERS, getPapers)]);
    yield all([takeLatest(actions.GETALLLAWSUITES, getAllLawsuites)]);
    yield all([takeLatest(actions.GETCASETYPES, getCaseTypes)]);
    yield all([takeLatest(actions.CREATECASETYPES, createCaseTypes)]);
    yield all([takeLatest(actions.UPDATECASETYPES, updateCaseTypes)]);
    yield all([takeLatest(actions.DELETECASETYPES, deleteCaseTypes)]);
}