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
    MenuItem, 
    Select,
    Autocomplete,
    TextField
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
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function create({...others}){
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const roles = [
        {label: 'Admin', id: 1},
        {label: 'User', id:2}
    ];

    const data = useSelector((state)=>state.userReducer);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [userdata, setUserData] = useState([]);
    
    useEffect(() => {
        setUserData(data.userData);
    },[data]);

    useEffect(()=>{
        dispatch({
            type: actions.GETUSER,
            payload: id
        });
    },[]);

    if(!userdata){
        return;
    }

    return (
        
        <>
            <Box sx={{ bgcolor: 'background.paper'}}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Home</Typography>
                                <Typography>Edit User</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={7.7}>
                        </Grid>
                        <Grid item xs={1.3}>
                            <NavLink to="/users">
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
                                    first_name: data.userData ? data.userData.first_name : '',
                                    last_name: data.userData ? data.userData.last_name : '',
                                    email: data.userData ? data.userData.email : '',
                                    user_name: data.userData ? data.userData.user_name : '',
                                    password: '',
                                    password_confirmation: '',
                                    roles_id: [],
                                    status: data.userData ? data.userData.status : '',
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    first_name: Yup.string().required('First Name is required'),
                                    last_name: Yup.string().required('Last Name is required'),
                                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                    user_name: Yup.string().max(15).required('User Name is required'),
                                    password: Yup.string().min(8).max(255).required('Password is required'),
                                    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
                                    roles_id: Yup.array().min(1, 'Please select at least one role'),
                                    status: Yup.string().oneOf(['0', '1', '2'], 'Please select a valid status').required('Status is required')
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);

                                        const roleIds = values.roles_id.map(role => role.id);
                                        values.roles_id = roleIds;

                                        console.log(values);
                                        dispatch({
                                            type: actions.UPDATEUSER,
                                            payload: values,
                                            id: id,
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
                                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} {...others}>
                                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:6, md:12}}>
                                        
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-first_name-user_create">First name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-first_name-user_create"
                                                    type="text"
                                                    name="first_name"
                                                    value={values.first_name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="First name"
                                                    inputProps={{}}
                                                />
                                                {touched.first_name && errors.first_name && (
                                                    <FormHelperText error id="standard-weight-helper-text-first_name-user_create">
                                                    {errors.first_name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-last_name-user_create">Last name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-last_name-user_create"
                                                    type="text"
                                                    name="last_name"
                                                    value={values.last_name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Last name"
                                                    inputProps={{}}
                                                />
                                                {touched.last_name && errors.last_name && (
                                                    <FormHelperText error id="standard-weight-helper-text-last_name-user_create">
                                                    {errors.last_name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-email-user_create">Email</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-user_create"
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email"
                                                    inputProps={{}}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-user_create">
                                                    {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.user_name && errors.user_name)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-user_name-user_create">Name User</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-user_name-user_create"
                                                    type="text"
                                                    name="user_name"
                                                    value={values.user_name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Name User"
                                                    inputProps={{}}
                                                />
                                                {touched.user_name && errors.user_name && (
                                                    <FormHelperText error id="standard-weight-helper-text-user_name-login">
                                                    {errors.user_name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password-user_create">Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-user_create"
                                                    type="password"
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Password"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-user_create">
                                                    {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={4}>
                                            <FormControl fullWidth error={Boolean(touched.password_confirmation && errors.password_confirmation)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-password_confirmation-user_create">Confirm password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password_confirmation-user_create"
                                                    type="password"
                                                    name="password_confirmation"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Confirm password"
                                                    inputProps={{}}
                                                />
                                                {touched.password_confirmation && errors.password_confirmation && (
                                                    <FormHelperText error id="standard-weight-helper-text-password_confirmation-user_create">
                                                        {errors.password_confirmation}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={2} sm={3} md={6}>
                                            <FormControl fullWidth error={Boolean(touched.roles_id && errors.roles_id)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <Autocomplete
                                                    multiple
                                                    id="standard-weight-helper-text-roles_id-user_create"
                                                    name="roles_id"
                                                    onBlur={handleBlur}
                                                    onChange={(event, value)=>setFieldValue('roles_id', value)}
                                                    options={roles}
                                                    getOptionLabel={(option) => option.label}
                                                    value={values.roles_id}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    filterSelectedOptions
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Select Roles"
                                                        placeholder="Select Roles"
                                                    />
                                                    )}
                                                />
                                                {touched.roles_id && errors.roles_id && (
                                                    <FormHelperText error id="standard-weight-helper-text-roles_id-user_create">
                                                        {errors.roles_id}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} sm={3} md={6}>
                                            <FormControl fullWidth error={Boolean(touched.status && errors.status)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-status-user_create">User status</InputLabel>
                                                <Select
                                                    labelId="outlined-adornment-status-user_create"
                                                    id="outlined-adornment-status-user_status"
                                                    name="status"
                                                    value={values.status}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="User status"
                                                >
                                                    <MenuItem value={3}>Select User status</MenuItem>
                                                    <MenuItem value={0}>Active</MenuItem>
                                                    <MenuItem value={1}>Inactive</MenuItem>
                                                    <MenuItem value={2}>Pending</MenuItem>
                                                </Select>
                                                {touched.status && errors.status && (
                                                    <FormHelperText error id="standard-weight-helper-text-status-user_create">
                                                        {errors.status}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                    </Grid>

                                    <Box sx={{ mt: 3 }}>
                                        <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                            Edit User
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