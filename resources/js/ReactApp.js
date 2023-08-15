import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import actions from './redux/Authenticate/actions';
// import Spinner from './components/Spinner';
import {AppRoutes} from './routes/AppRoutes';

import { ReactAppStyled } from './ReactApp.styled';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      "Cairo",
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Noto Sans",
      "Noto Color Emoji"
    ].join(','),
    fontSize: 13
  },
});

function ReactApp() {
  //Getting isAuthenticated store value from Authentication reducer.
  const {isAuthenticated, validateUserLoader} = useSelector(state => state.authenticateReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      // dispatch({
      //   type: actions.GET_AUTH_USER,
      // });
    }
  }, [])

  if (validateUserLoader) {
    // return <Spinner/>;
  }
  return (
    <ThemeProvider theme={fontTheme}>
      <ReactAppStyled>
        <AppRoutes isAuthenticated={isAuthenticated}/>
      </ReactAppStyled>
    </ThemeProvider>
  );
}

export default ReactApp;
