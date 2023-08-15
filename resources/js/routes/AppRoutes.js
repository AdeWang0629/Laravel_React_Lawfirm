import {lazy, Suspense} from 'react';
import { Router, Switch } from 'react-router-dom';
import history from '../config/history';
import {PrivateRoute, PublicRoute} from '../routes/helpers';
import ProtectedRoutes from '../routes/ProtectedRoutes';

const LoginPage = lazy(() => import('../components/auth/SingIn'));

import { ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

export function AppRoutes({isAuthenticated}) {
  return (
    <Router history={history}>
      <Suspense fallback={<CircularProgress sx={{margin: 'auto'}} />}>
        <Switch>
          <PublicRoute path="/" isAuthenticated={isAuthenticated} link='/home' exact>
            <LoginPage/>
            <ToastContainer />
          </PublicRoute>
          <PublicRoute path="/login" isAuthenticated={isAuthenticated} link='/home' exact>
            <LoginPage/>
            <ToastContainer />
          </PublicRoute>
          <PrivateRoute path="/" isAuthenticated={isAuthenticated} >
            <ProtectedRoutes/>
            <ToastContainer />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
