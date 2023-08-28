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

function* getExpenseSections() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/expense-sections'));

        yield put({type:actions.GETEXPENSESECTIONSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* createExpenseSections(action) {
    try{
        const response = yield call(() => postCustomRequest('api/admin/expense-sections', action.payload));

        toast.success("Expense Sections Creating was successful.");
        yield put({type:actions.GETEXPENSESECTIONSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* updateExpenseSections(action) {
    try{
        const response = yield call(() => putCustomRequest('api/admin/expense-sections', action.id, action.payload));

        toast.success("Expense Sections Updating was successful.");
        yield put({type:actions.GETEXPENSESECTIONSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* deleteExpenseSections(action) {
    try{
        const response = yield call(() => deleteCustomRequest('api/admin/expense-sections', action.payload));

        toast.success("Expense Sections deleting was successful.");
        yield put({type:actions.GETEXPENSESECTIONSSUCCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* getPayments() {
    try{
        const response = yield call(() => getCustomRequest('api/admin/payments'));

        yield put({type:actions.GETPAYMENTSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* createPayments(action) {
    try{
        const response = yield call(() => postCustomRequest('api/admin/payments', action.payload));

        toast.success("Payments Creating was successful.");
        yield put({type:actions.GETPAYMENTSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* updatePayments(action) {
    try{
        const response = yield call(() => putCustomRequest('api/admin/payments', action.id, action.payload));

        toast.success("Payments Updating was successful.");
        yield put({type:actions.GETPAYMENTSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

function* deletePayments(action) {
    try{
        const response = yield call(() => deleteCustomRequest('api/admin/payments', action.payload));

        toast.success("Payments deleting was successful.");
        yield put({type:actions.GETPAYMENTSSUCESS, payload:response.data});
    } catch(error){
        toast.error(error.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GETBRANCHES, getBranches)]);
    yield all([takeLatest(actions.CREATEBRANCHES, createBranches)]);
    yield all([takeLatest(actions.UPDATEBRANCHES, updateBranches)]);
    yield all([takeLatest(actions.DELETEBRANCHES, deleteBranches)]);
    yield all([takeLatest(actions.GETEXPENSESECTIONS, getExpenseSections)]);
    yield all([takeLatest(actions.CREATEEXPENSESECTIONS, createExpenseSections)]);
    yield all([takeLatest(actions.UPDATEEXPENSESECTIONS, updateExpenseSections)]);
    yield all([takeLatest(actions.DELETEEXPENSESECTIONS, deleteExpenseSections)]);
    yield all([takeLatest(actions.GETPAYMENTS, getPayments)]);
    yield all([takeLatest(actions.CREATEPAYMENTS, createPayments)]);
    yield all([takeLatest(actions.UPDATEPAYMENTS, updatePayments)]);
    yield all([takeLatest(actions.DELETEPAYMENTS, deletePayments)]);
}