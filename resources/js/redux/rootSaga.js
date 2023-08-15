import { all } from 'redux-saga/effects';
import authenticateSaga from './Authenticate/apiSaga';
import adminHomeSaga from './Admin/Home/apiSaga';
import userSaga from './Admin/User/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga(){
  yield all([
    authenticateSaga(),
    adminHomeSaga(),
    userSaga()
  ]);
}
