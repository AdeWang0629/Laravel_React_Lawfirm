import { all } from 'redux-saga/effects';
import authenticateSaga from './Authenticate/apiSaga';
import adminHomeSaga from './Admin/Home/apiSaga';
import userSaga from './Admin/User/apiSaga';
import roleSaga from './Admin/Role/apiSaga';
import clientSaga from './Admin/Client/apiSaga';
import lawsuiteSaga from './Admin/Lawsuite/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga(){
  yield all([
    authenticateSaga(),
    adminHomeSaga(),
    userSaga(),
    roleSaga(),
    clientSaga(),
    lawsuiteSaga()
  ]);
}
