import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {getCustomRequest, putCustomRequest, postCustomRequest, retriveCustomRequest, deleteCustomRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* getClients() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/clients-types'));
        yield put({type:actions.GETCLIENTSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* createClientsTypes(action) {
    try{
        const response = yield call(() => postCustomRequest('api/admin/clients-types', action.payload));
        toast.success("Category Creating was successful.");
        yield put({type:actions.GETCLIENTSSUCCESS, payload:response.data});
        // yield call(browserRedirect, '/clients-types');
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* deleteClientsTypes(action) {
    try{
        const response = yield call(() => deleteCustomRequest('api/admin/clients-types', action.payload));
        toast.success("Category deleting was successful.");
        yield put({type:actions.GETCLIENTSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* updateClientsTypes(action) {
    try{
        const response = yield call(() => putCustomRequest('api/admin/clients-types', action.id, action.payload));
        toast.success("Category Updating was successful.");
        yield put({type:actions.GETCLIENTSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETCLIENTS, getClients)]);
    yield all([takeLatest(actions.CREATECLIENTSTYPES, createClientsTypes)]);
    yield all([takeLatest(actions.DELETECLIENTSTYPES, deleteClientsTypes)]);
    yield all([takeLatest(actions.UPDATECLIENTSTYPES, updateClientsTypes)]);
}