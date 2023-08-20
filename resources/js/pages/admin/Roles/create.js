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
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch } from 'react-redux';
import actions from '../../../redux/Admin/Role/actions';

import { grey } from '@mui/material/colors';

import { NavLink } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function create({...others}){
    const dispatch = useDispatch();
    const [permissions, setPermissions] = useState([]);
    const data = useSelector((state )=> state.roleReducer);

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    useEffect(()=>{
        dispatch({
            type: actions.GETPERMISSION
        });
    }, []);

    useEffect(()=>{
        setPermissions(data.permissionData);
    });

    console.log(permissions);

    if(!permissions){
        return null;
    }

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper'}}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Home</Typography>
                                <Typography>Add new Role</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={7.7}>
                        </Grid>
                        <Grid item xs={1.3}>
                            <NavLink to="/roles">
                                <Button variant="contained" color='secondary'>
                                    <KeyboardBackspaceIcon />
                                    All Roles
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            ADD NEW ROLE
                        </Typography>

                        <Box mt={2}>
                            <Formik
                                initialValues={{
                                    termsAndConditions: false,
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (scriptedRef.current) {
                                        setStatus({ success: true });
                                        setSubmitting(false);
                                        console.log(values);
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
                                        
                                        <Grid item xs={2} sm={6} md={12}>
                                            <FormControl fullWidth error={Boolean(touched.role_name && errors.role_name)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                                <InputLabel htmlFor="outlined-adornment-role_name-role_create">Name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-role_name-user_create"
                                                    type="text"
                                                    name="role_name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Role Name"
                                                    inputProps={{}}
                                                />
                                                {touched.role_name && errors.role_name && (
                                                    <FormHelperText error id="standard-weight-helper-text-role_name-user_create">
                                                        {errors.role_name}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        {
                                            // permissions 
                                            // ?
                                            // permissions.map((item)=>(
                                            //     <Grid item xs={2} sm={1} md={2}>
                                            //         <FormControlLabel
                                            //             control={
                                            //                 <Checkbox
                                            //                     name="termsAndConditions"
                                            //                     checked={values.termsAndConditions}
                                            //                     onChange={handleChange}
                                            //                 />
                                            //             }
                                            //             label={item.name}
                                            //         />
                                            //         {touched.termsAndConditions && errors.termsAndConditions && (
                                            //             <div>{errors.termsAndConditions}</div>
                                            //         )}
                                            //     </Grid>
                                            // ))
                                            // :
                                            // ''
                                        }
                                    </Grid>

                                    <Box sx={{ mt: 3 }}>
                                        <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                            Add new Role
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