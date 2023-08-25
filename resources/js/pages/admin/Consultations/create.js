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
    Autocomplete,
    TextField,
    Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Admin/Consultation/actions';

import { grey } from '@mui/material/colors';

import { NavLink } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';

import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function create({...others}){
    const dispatch = useDispatch();

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [ count, setCount ] = useState(1);
    const [value, setValue] = useState(dayjs('2000-01-01'));

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };

    useEffect(()=>{
        dispatch({
            type: actions.GETCONSULTATION
        });
    },[]);
    
    const handleDeleteOpponent = (values, index, setValues) => {
        const updatedOpponents = [...values.opponents];
        updatedOpponents.splice(index, 1);
        setValues({ ...values, opponents: updatedOpponents });
    };

    const consultationsData = useSelector((state)=>state.consultationReducer.consultationsData);
    console.log(consultationsData);
    const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);
    const addNewCategory = () => {
        setOpenAddNewCategoryModal(true);
    }
    const handleCloseAddNewCategoryModal = () => {
        setOpenAddNewCategoryModal(false);
    };

    // useEffect(()=>{
    //     setOpenAddNewCategoryModal(false);
    // },[clientTypesData]);

    const [openAddNewCategoryClientModal, setOpenAddNewCategoryClientModal] = useState(false);
    const addNewCategoryClient = () => {
        setOpenAddNewCategoryClientModal(true);
    }
    const handleCloseAddNewCategoryClientModal = () => {
        setOpenAddNewCategoryClientModal(false);
    };

    return (
        <>
            <Box>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60 }}>
                    <Grid container columnSpacing={{ xs: 1, sm: 1, md: 3 }} rowSpacing={{ xs: 1, sm: 1, md: 3 }} columns={{xs:2, sm:8, md:16}}>
                        <Grid item sm={8} md={5}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Home</Typography>
                                <Typography>Add new Consultation</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item sm={8} md={5}>

                        </Grid>
                        <Grid item sm={8} md={6}>
                            <NavLink to="/consultations">
                                <Button variant="contained" color='secondary' style={{marginRight: 10, marginBottom: 10}}>
                                    All Consultations
                                    <AddIcon />
                                </Button>
                            </NavLink>
                            
                            <Button variant="contained" style={{marginBottom: 10}} onClick={() => addNewCategoryClient()}>
                                Add new Client
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    
                <Formik
                    initialValues={{
                        client_id: '',
                        consultation_subject: '',
                        datepicker: value,
                        total_amount: 1.01,
                        vat: 1,
                        contract_amount: 1,
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        // client_id: Yup.string().required('Please select a category client'),
                        // client_type_id: Yup.string().required('Please select a category client'),
                        // opponents: Yup.array().of(
                        //     Yup.object().shape({
                        //         // opponent_name: Yup.string().required('Opponent name is required'),
                        //         // opponent_phone: Yup.string().required('Opponent phone is required'),
                        //         // opponent_section: Yup.string(),
                        //         // opponent_city: Yup.string(),
                        //         // opponent_address: Yup.string(),
                        //         // opponent_lawyer: Yup.string(),
                        //         // opponent_lawyer_phone: Yup.string(),
                        //     })
                        // ),
                        // lawsuite_subject: Yup.string().required('Please select a lawsuite subject')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);

                            console.log(values);

                            // dispatch({
                            //     type: actions.CREATELAWSUITES,
                            //     payload: values,
                            // });
                        }
                    } catch (err) {
                            console.log('error');
                            console.error(err);
                            if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, setValues, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                            <Divider textAlign="left">
                                <Typography varient='h4' mb={.5} className='weight-7'>
                                    CONSULTATION INFORMATION
                                </Typography>
                            </Divider>

                            <Box mt={2} mb={5}>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:8, md:12}}>
                                    
                                    <Grid item xs={2} sm={8} md={6}>
                                        <FormControl fullWidth error={Boolean(touched.client_id && errors.client_id)} sx={{ ...theme.typography.customInput, mt: 2 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-client_id-lawsuite_create"
                                                name="client_id"
                                                onBlur={handleBlur}
                                                options={consultationsData}
                                                getOptionLabel={(option) => option.client.name}
                                                renderInput={(params) => <TextField {...params} label="Choose Client" />}
                                                // value={consultationsData.find((option) => option.client.user_name === values.client_id) || null}
                                                // onChange={(event, newValue) => {
                                                //     setFieldValue('client_id', newValue ? newValue.consultation_number : '');
                                                // }}
                                                size="small"
                                            />
                                            {touched.client_id && errors.client_id && (
                                                <FormHelperText error id="standard-weight-helper-text-client_id-lawsuite_create">
                                                    {errors.client_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={8} md={6}>
                                        <FormControl fullWidth error={Boolean(touched.consultation_subject && errors.consultation_subject)} sx={{ ...theme.typography.customInput, mt: 2 }} size="small">
                                            <InputLabel htmlFor="outlined-adornment-consultation_subject">Consultation Subject</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-consultation_subject"
                                                type="text"
                                                name="consultation_subject"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Consultation Subject"
                                                inputProps={{}}
                                            />
                                            {touched.consultation_subject && errors.consultation_subject && (
                                                <FormHelperText error id="outlined-adornment-consultation_subject">
                                                {errors.consultation_subject}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl error={Boolean(touched.contract_date && errors.contract_date)} sx={{ ...theme.typography.customInput, mt: 1 }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Controlled picker"
                                                        name="contract_date"
                                                        value={values.datepicker}
                                                        onChange={(newValue) => {
                                                            const formattedDate = newValue.toISOString().split('T')[0];
                                                            setValues({ ...values, datepicker: formattedDate });
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            {touched.contract_date && errors.contract_date && (
                                                <FormHelperText error id="standard-weight-helper-text-contract_date-lawsuite_create">
                                                {errors.contract_date}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.laywer_opponent && errors.laywer_opponent)} sx={{ ...theme.typography.customInput, mt: 2 }}>
                                            <InputLabel htmlFor="outlined-adornment-contract_amount-lawsuite_create">Contract amount</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-contract_amount-lawsuite_create"
                                                type="number"
                                                name="contract_amount"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.contract_amount}
                                                label="Contract amount"
                                                inputProps = {{
                                                    step: 1, // Step value
                                                }}
                                            />
                                            {touched.contract_amount && errors.contract_amount && (
                                                <FormHelperText error id="standard-weight-helper-text-contract_amount-lawsuite_create">
                                                {errors.contract_amount}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.vat && errors.vat)} sx={{ ...theme.typography.customInput, mt: 2 }}>
                                            <InputLabel htmlFor="outlined-adornment-vat-lawsuite_create">Vat amount</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-vat-lawsuite_create"
                                                type="number"
                                                name="vat"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.vat}
                                                label="Vat amount"
                                                inputProps = {{
                                                    step: 1, // Step value
                                                }}
                                            />
                                            {touched.vat && errors.vat && (
                                                <FormHelperText error id="standard-weight-helper-text-vat-lawsuite_create">
                                                {errors.vat}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.total_amount && errors.total_amount)} sx={{ ...theme.typography.customInput, mt: 2 }} disabled >
                                            <InputLabel htmlFor="outlined-adornment-total_amount-lawsuite_create">Contract amount including tax</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-total_amount-lawsuite_create"
                                                type="text"
                                                name="total_amount"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.total_amount}
                                                label="Contract amount including tax"
                                                inputProps={{}}
                                            />
                                            {touched.total_amount && errors.total_amount && (
                                                <FormHelperText error id="standard-weight-helper-text-total_amount-lawsuite_create">
                                                {errors.total_amount}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider textAlign="left">
                                <Typography varient='h4' mb={.5} className='weight-7'>
                                    CONTRACT INFORMATION
                                </Typography>
                            </Divider>

                            <Box mt={2} mb={5}>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:8, md:12}}>

                                    <Grid item xs={2} sm={8} md={12}>
                                        <FormControl fullWidth error={Boolean(touched.contract_terms && errors.contract_terms)} sx={{ ...theme.typography.customInput, mt: 1, border: '1px solid #0d0d0d2e', maxHeight: '400px', minHeight: '400px', borderRadius: '5px' }}>
                                            <Editor
                                                editorState={editorState}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={onEditorStateChange}
                                                placeholder='Contract terms'
                                                name="contract_terms"
                                            />
                                            {touched.contract_terms && errors.contract_terms && (
                                                <FormHelperText error id="standard-weight-helper-text-contract_terms-lawsuite_create">
                                                {errors.contract_terms}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary" fullWidth>
                                    Add
                                </Button>
                            </Box>
                        </Card>
                    </form>
                    )}
                </Formik>
                
                <Dialog
                    open={openAddNewCategoryModal}
                    onClose={handleCloseAddNewCategoryModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Add New Category"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);

                                // dispatch({
                                //     type: actions2.CREATECLIENTSTYPES,
                                //     payload: values,
                                // });
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
                            <DialogContent>
                                <Box width={500}>
                                    <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput}}>
                                        <InputLabel htmlFor="outlined-adornment-name- clients_types_create">Caegory Name</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-name-user_create"
                                            type="text"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Name"
                                            inputProps={{}}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-name-clients_types_create">
                                            {errors.name}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAddNewCategoryModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>

                <Dialog
                    open={openAddNewCategoryClientModal}
                    onClose={handleCloseAddNewCategoryClientModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Add New Category Client"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);

                                // dispatch({
                                //     type: actions2.CREATECLIENTSTYPES,
                                //     payload: values,
                                // });
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
                            <DialogContent>
                                <Box width={500}>
                                    <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput}}>
                                        <InputLabel htmlFor="outlined-adornment-name- clients_types_create">Name</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-name-user_create"
                                            type="text"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Name"
                                            inputProps={{}}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-name-clients_types_create">
                                            {errors.name}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAddNewCategoryClientModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>
                </Box>
            </Box>
        </>
    );
}