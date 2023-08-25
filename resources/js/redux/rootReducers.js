import authenticateReducer from './Authenticate/reducer';
import adminHomeReducer from './Admin/Home/reducer';
import userReducer from './Admin/User/reducer';
import roleReducer from './Admin/Role/reducer';
import clientReducer from './Admin/Client/reducer';
import lawsuiteReducer from './Admin/Lawsuite/reducer';
import caseSessionReducer from './Admin/CaseSession/reducer';
import consultationReducer from './Admin/Consultation/reducer';
import expensesReducer from './Admin/Expenses/reducer';

//Include all the reducer to combine and provide to configure store.
export default {
  authenticateReducer,
  adminHomeReducer,
  userReducer,
  roleReducer,
  clientReducer,
  lawsuiteReducer,
  caseSessionReducer,
  consultationReducer,
  expensesReducer
}
