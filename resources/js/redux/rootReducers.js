import authenticateReducer from './Authenticate/reducer';
import adminHomeReducer from './Admin/Home/reducer';
import userReducer from './Admin/User/reducer';

//Include all the reducer to combine and provide to configure store.
export default {
  authenticateReducer,
  adminHomeReducer,
  userReducer
}
