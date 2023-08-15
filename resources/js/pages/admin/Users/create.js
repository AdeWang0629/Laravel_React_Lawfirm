import {
    Typography,
    Breadcrumbs,
    Box,
    Grid,
    Button,
    Card,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch } from 'react-redux';
import actions from '../../../redux/Admin/User/actions';

import { grey } from '@mui/material/colors';

import { NavLink } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';

export default function create({...others}){
    const dispatch = useDispatch();

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper'}}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Home</Typography>
                                <Typography>Add new User</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={7.7}>
                        </Grid>
                        <Grid item xs={1.3}>
                            <NavLink to="/users/create">
                                <Button variant="contained" color='secondary'>
                                    <KeyboardBackspaceIcon />
                                    All Users
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            ADD NEW USER
                        </Typography>

                        <Box mt={2}>
                            <Formik
                                initialValues={{
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    username: '',
                                    password: '',
                                    password_confirmation: '',
                                    roles_id: [],
                                    status: '',
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                    password: Yup.string().max(255).required('Password is required')
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                        dispatch({
                                            type: actions.LOGIN,
                                            payload: values,
                                        });
                                    }
                                } catch (err) {
                                        console.error(err);
                                        if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} {...others}>
                                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:6, md:12}}>
                                        
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-first_name-login">First name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-first_name-login"
                                                    type="text"
                                                    name="first_name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="First name"
                                                    inputProps={{}}
                                                />
                                                {touched.first_name && errors.first_name && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.first_name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-last_name-login">Last name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-last_name-login"
                                                    type="text"
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Last name"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    type="email"
                                                    value={values.email}
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email"
                                                    inputProps={{}}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password-login">Name User</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="password"
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Name User"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="password"
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Password"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password-login">Confirm password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="password"
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Confirm password"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={2} sm={3} md={6}>
                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password-login">Selecet Roles</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="password"
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Password"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={3} md={6}>
                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password-login">User status</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type="password"
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="User status"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 3 }} >
                                        <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                            Forgot Password?
                                        </Typography>
                                    </Stack>
                                    {errors.submit && (
                                        <Box sx={{ mt: 3 }}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Box>
                                    )}

                                    <Box sx={{ mt: 3 }}>
                                            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                            Sign in
                                            </Button>
                                    </Box>
                                </form>
                                )}
                            </Formik>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    );
}