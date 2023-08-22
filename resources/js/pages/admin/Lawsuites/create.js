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
import actions from '../../../redux/Admin/Lawsuite/actions';
import actions2 from '../../../redux/Admin/Client/actions';

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
            type: actions.GETCREATELAWSUITES
        });
    },[]);
    
    const handleDeleteOpponent = (values, index, setValues) => {
        const updatedOpponents = [...values.opponents];
        updatedOpponents.splice(index, 1);
        setValues({ ...values, opponents: updatedOpponents });
    };

    const opponent_information = (handleBlur, handleChange, touched, errors, values, index, setValues) => {
        return (
            <Box mt={2} key={index}>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:8, md:12}}>
                    
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-opponent_name-lawsuite_create-${index}`}>Opponent Name</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-opponent_name-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_name`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Opponent Name"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-opponent_phone-lawsuite_create-${index}`}>Opponent Phone</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-opponent_phone-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_phone`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Opponent Phone"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-station-lawsuite_create-${index}`}>station</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-station-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_section`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="station"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-city-lawsuite_create-${index}`}>City</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-city-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_city`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="City"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-opponent_address-lawsuite_create-${index}`}>Opponent Address</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-opponent_address-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_address`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Opponent Address"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-laywer_opponent-lawsuite_create-${index}`}>lawyer's Opponent</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-laywer_opponent-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_lawyer`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="lawyer's Opponent"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            <InputLabel htmlFor={`outlined-adornment-lawyer_phone_opponent-lawsuite_create-${index}`}>lawyer phone's Opponent</InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-lawyer_phone_opponent-lawsuite_create-${index}`}
                                type="text"
                                name={`opponents[${index}].opponent_lawyer_phone`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="lawyer phone's Opponent"
                                inputProps={{}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3}>
                        <FormControl fullWidth sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                            {
                                index >=1 ? (
                                    <Button variant="contained" color="error" fullWidth onClick={() => handleDeleteOpponent(values, index, setValues)}>
                                        Delete
                                    </Button>
                                ) : (
                                    ''
                                )
                            }
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    const clientsData = useSelector((state)=>state.lawsuiteReducer.clientsData);
    const clientTypesData = useSelector((state)=>state.lawsuiteReducer.clientTypesData);
    const caseTypesData = useSelector((state)=>state.lawsuiteReducer.caseTypesData);
    const caseStagesData = useSelector((state)=>state.lawsuiteReducer.caseStagesData);
    const lawsuiteCasesData = useSelector((state)=>state.lawsuiteReducer.lawsuiteCasesData);
    const courtsData = useSelector((state)=>state.lawsuiteReducer.courtsData);

    const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);
    const addNewCategory = () => {
        setOpenAddNewCategoryModal(true);
    }
    const handleCloseAddNewCategoryModal = () => {
        setOpenAddNewCategoryModal(false);
    };

    useEffect(()=>{
        setOpenAddNewCategoryModal(false);
    },[clientTypesData]);

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
                                <Typography>Add new Lawsuite</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item sm={8} md={5}>

                        </Grid>
                        <Grid item sm={8} md={6}>
                            <Button variant="contained" color='secondary' style={{marginRight: 10, marginBottom: 10}} onClick={() => addNewCategory()}>
                                Add new category
                                <AddIcon />
                            </Button>
                            
                            <Button variant="contained" style={{marginBottom: 10}} onClick={() => addNewCategoryClient()}>
                                Add new category Client
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    
                <Formik
                    initialValues={{
                        client_id: '',
                        client_type_id: '',
                        opponents: [{opponent_name: '', opponent_phone: '', opponent_section: '', opponent_city: '', opponent_address: '', opponent_lawyer: '', opponent_lawyer_phone: ''}],
                        lawsuite_subject:'',
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
                            
                            values.client_id = clientsData.filter((item)=>item.name == values.client_id);
                            values.client_id = values.client_id[0].id;

                            values.client_type_id = clientTypesData.filter((item)=>item.name == values.client_type_id);
                            values.client_type_id = values.client_type_id[0].id;

                            values.case_type_id = caseTypesData.filter((item)=>item.name == values.case_type_id);
                            values.case_type_id = values.case_type_id[0].id;

                            values.case_stage_id = caseStagesData.filter((item)=>item.name == values.case_stage_id);
                            values.case_stage_id = values.case_stage_id[0].id;

                            values.court_id = courtsData.filter((item)=>item.name == values.court_id);
                            values.court_id = values.court_id[0].id;

                            values.lawsuit_case_id = lawsuiteCasesData.filter((item)=>item.name == values.lawsuit_case_id);
                            values.lawsuit_case_id = values.lawsuit_case_id[0].id;

                            dispatch({
                                type: actions.CREATELAWSUITES,
                                payload: values,
                            });
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
                                    CLIENT INFORMATION
                                </Typography>
                            </Divider>

                            <Box mt={2} mb={5}>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:6, md:12}}>
                                    
                                    <Grid item xs={2} sm={6} md={6}>
                                        <FormControl fullWidth error={Boolean(touched.client_id && errors.client_id)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-client_id-lawsuite_create"
                                                name="client_id"
                                                onBlur={handleBlur}
                                                options={clientsData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => <TextField {...params} label="Choose Client" />}
                                                value={clientsData.find((option) => option.name === values.client_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('client_id', newValue ? newValue.name : '');
                                                }}
                                                size="small"
                                            />
                                            {touched.client_id && errors.client_id && (
                                                <FormHelperText error id="standard-weight-helper-text-client_id-lawsuite_create">
                                                    {errors.client_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={6} md={6}>
                                        <FormControl fullWidth error={Boolean(touched.client_type_id && errors.client_type_id)} sx={{ ...theme.typography.customInput, mt: 3 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-client_type_id-lawsuite_create"
                                                name="client_type_id"
                                                onBlur={handleBlur}
                                                options={clientTypesData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => <TextField {...params} label="Choose category Client" />}
                                                value={clientTypesData.find((option) => option.name === values.client_type_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('client_type_id', newValue ? newValue.name : '');
                                                }}
                                                size="small"
                                            />
                                            {touched.client_type_id && errors.client_type_id && (
                                                <FormHelperText error id="standard-weight-helper-text-client_type_id-lawsuite_create">
                                                    {errors.client_type_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            
                            <Divider textAlign="left">
                                <Typography varient='h4' mb={.5} className='weight-7'>
                                    OPPONENTS INFORMATION
                                </Typography>
                            </Divider>

                            {values.opponents.map((opponent, index) => (
                                opponent_information(handleBlur, handleChange, touched, errors, values, index, setValues)
                            ))}
                            
                            <Box sx={{ mt: 3, mb: 5 }}>
                                <Button disableElevation disabled={isSubmitting} size="small" type="submit" variant="contained" color="success" onClick={()=> setFieldValue('opponents', [...values.opponents, {}])}>
                                    Add new Opponent
                                </Button>
                            </Box>
                            
                            <Divider textAlign="left">
                                <Typography varient='h4' mb={.5} className='weight-7'>
                                    LAWSUITE INFORMATION
                                </Typography>
                            </Divider>

                            <Box mt={2} mb={5}>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:8, md:12}}>
                                    
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.case_type_id && errors.case_type_id)} sx={{ ...theme.typography.customInput, mt: 1 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-case_type_id-lawsuite_create"
                                                name="case_type_id"
                                                onBlur={handleBlur}
                                                options={caseTypesData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => <TextField {...params} label="Choose category Lawsuite" />}
                                                value={caseTypesData.find((option) => option.name === values.case_type_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('case_type_id', newValue ? newValue.name : '');
                                                }}
                                                size="small"
                                            />
                                            {touched.case_type_id && errors.case_type_id && (
                                                <FormHelperText error id="standard-weight-helper-text-case_type_id-lawsuite_create">
                                                    {errors.case_type_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.lawsuite_lawyer && errors.lawsuite_lawyer)} sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                                            <InputLabel htmlFor="outlined-adornment-lawsuite_lawyer-lawsuite_create">lawyer's Lawsuite</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-lawsuite_lawyer-lawsuite_create"
                                                type="text"
                                                name="lawsuite_lawyer"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="lawyer's Lawsuite"
                                                inputProps={{}}
                                            />
                                            {touched.lawsuite_lawyer && errors.lawsuite_lawyer && (
                                                <FormHelperText error id="standard-weight-helper-text-lawsuite_lawyer-lawsuite_create">
                                                {errors.lawsuite_lawyer}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={6}>
                                        <FormControl fullWidth error={Boolean(touched.lawsuite_subject && errors.lawsuite_subject)} sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                                            <InputLabel htmlFor="outlined-adornment-lawsuite_subject-lawsuite_create">Subject Lawsuite</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-lawsuite_subject-lawsuite_create"
                                                type="text"
                                                name="lawsuite_subject"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Subject Lawsuite"
                                                inputProps={{}}
                                            />
                                            {touched.lawsuite_subject && errors.lawsuite_subject && (
                                                <FormHelperText error id="standard-weight-helper-text-lawsuite_subject-lawsuite_create">
                                                {errors.lawsuite_subject}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.case_stage_id && errors.case_stage_id)} sx={{ ...theme.typography.customInput, mt: 2 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-case_stage_id-lawsuite_create"
                                                name="case_stage_id"
                                                onBlur={handleBlur}
                                                options={caseStagesData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => <TextField {...params} label="Choose Stage Litigation" />}
                                                value={caseStagesData.find((option) => option.name === values.case_stage_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('case_stage_id', newValue ? newValue.name : '');
                                                }}
                                                size="small"
                                            />
                                            {touched.case_stage_id && errors.case_stage_id && (
                                                <FormHelperText error id="standard-weight-helper-text-case_stage_id-lawsuite_create">
                                                    {errors.case_stage_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.lawsuit_case_id && errors.lawsuit_case_id)} sx={{ ...theme.typography.customInput, mt: 2 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-lawsuit_case_id-lawsuite_create"
                                                name="lawsuit_case_id"
                                                onBlur={handleBlur}
                                                options={lawsuiteCasesData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => <TextField {...params} label="Choose case Lawsuite" />}
                                                value={lawsuiteCasesData.find((option) => option.name === values.lawsuit_case_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('lawsuit_case_id', newValue ? newValue.name : '');
                                                }}
                                                size="small"
                                            />
                                            {touched.lawsuit_case_id && errors.lawsuit_case_id && (
                                                <FormHelperText error id="standard-weight-helper-text-lawsuit_case_id-lawsuite_create">
                                                    {errors.lawsuit_case_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.court_id && errors.court_id)} sx={{ ...theme.typography.customInput, mt: 2 }}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-court_id-lawsuite_create"
                                                name="court_id"
                                                onBlur={handleBlur}
                                                options={courtsData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => <TextField {...params} label="Choose Court" />}
                                                value={courtsData.find((option) => option.name === values.court_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('court_id', newValue ? newValue.name : '');
                                                }}
                                                size="small"
                                            />
                                            {touched.court_id && errors.court_id && (
                                                <FormHelperText error id="standard-weight-helper-text-court_id-lawsuite_create">
                                                    {errors.court_id}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={3}>
                                        <FormControl fullWidth error={Boolean(touched.court_lawsuite_number && errors.court_lawsuite_number)} sx={{ ...theme.typography.customInput, mt: 2 }} size="small">
                                            <InputLabel htmlFor="outlined-adornment-court_lawsuite_number-lawsuite_create">Court lawsuites number</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-court_lawsuite_number-lawsuite_create"
                                                type="text"
                                                name="court_lawsuite_number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Court lawsuites number"
                                                inputProps={{}}
                                            />
                                            {touched.court_lawsuite_number && errors.court_lawsuite_number && (
                                                <FormHelperText error id="standard-weight-helper-text-court_lawsuite_number-lawsuite_create">
                                                {errors.court_lawsuite_number}
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
                                        <FormControl fullWidth error={Boolean(touched.contract_title && errors.contract_title)} sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                                            <InputLabel htmlFor="outlined-adornment-contract_title-lawsuite_create">Title</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-contract_title-lawsuite_create"
                                                type="text"
                                                name="contract_title"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Title"
                                                inputProps={{}}
                                            />
                                            {touched.contract_title && errors.contract_title && (
                                                <FormHelperText error id="standard-weight-helper-text-contract_title-lawsuite_create">
                                                {errors.contract_title}
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
                                    <Grid item xs={2} sm={8} md={12}>
                                        <FormControl fullWidth error={Boolean(touched.notes && errors.notes)} sx={{ ...theme.typography.customInput, mt: 1 }} size="small">
                                            <InputLabel htmlFor="outlined-adornment-notes-lawsuite_create">Notes</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-notes-lawsuite_create"
                                                type="text"
                                                name="notes"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="lawyer's Opponent"
                                                multiline
                                                rows={4}
                                                inputProps={{}}
                                            />
                                            {touched.notes && errors.notes && (
                                                <FormHelperText error id="standard-weight-helper-text-notes-lawsuite_create">
                                                {errors.notes}
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

                                dispatch({
                                    type: actions2.CREATECLIENTSTYPES,
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

                                dispatch({
                                    type: actions2.CREATECLIENTSTYPES,
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