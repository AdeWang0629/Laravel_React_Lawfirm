import {all, call, put, takeLatest} from 'redux-saga/effects'
import actions from './actions';
import {getCustomRequest, putCustomRequest, postCustomRequest, retriveCustomRequest, deleteCustomRequest} from '../../../config/axiosClient'
import { browserRedirect } from '../../../routes/helpers';
import axiosClient from '../../../config/axiosClient';
import axios from '../../../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function* rootSaga() {
}