import { Types } from './types.styled';
import {
    Typography,
    Breadcrumbs,
    Button,
    Card,
    Chip,
    Link,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import {
    Box,
    Grid,
    Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Admin/Client/actions';

import { grey } from '@mui/material/colors';

import { NavLink } from 'react-router-dom';

import { username_item, formate_date } from '../../../helpers';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';

//Table Style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function types({...others}){
    const dispatch = useDispatch();

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    
    const [trashedData, setTrashedData] = useState([]);
    const [clientTypes, setClientTypes] = useState([]);
    const data = useSelector((state)=> state.clientReducer);

    useEffect(()=>{
        dispatch({
            type: actions.GETCLIENTS
        });
    },[]);

    useEffect(()=>{
        setClientTypes(data.clientTypesData);
        setTrashedData(data.trashedData);
    });

    useEffect(()=>{
        setItem('');
        setOpenAddModal(false);
        setOpenEditModal(false);
    },[data]);

    const categoryDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETECLIENTSTYPES,
            payload: data.item.id
        });
        setDeleteModal(false);
    }

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [item, setItem] = useState();

    const handleClickOpen = (item) => {
        setDeleteModal(true);
        setItem(item);
    };
    
    const handleClose = () => {
        setDeleteModal(false);
    }
 
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const addNewCategory = () => {
        setOpenAddModal(true);
    }

    const editCategory = (item) => {
        setOpenEditModal(true);
        setItem(item);
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    return (
        <Types>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography>Clients categories</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <Button variant="contained" color='secondary' onClick={() => addNewCategory()}>
                                Add new Category
                                <AddIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            CLIENTS CATEGORIES 
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions Users...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">CATEGORY NAME</StyledTableCell>
                                        <StyledTableCell align="center">CASES COUNTS</StyledTableCell>
                                        <StyledTableCell align="center">ACTIONS</StyledTableCell>
                                        <StyledTableCell align="center">CREATED DATE</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {clientTypes.map((item, index) => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {item.name}
                                                </Typography>      
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {item.lawsuites_count}
                                                </Typography>   
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <EditIcon color="success" style={{ cursor: 'pointer', marginRight: 15}} onClick={() => editCategory(item)} />
                                                <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(item)} />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{formate_date(item.created_at)}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Box>


                <Dialog
                    open={openAddModal}
                    onClose={handleCloseAddModal}
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
                                    type: actions.CREATECLIENTSTYPES,
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
                                <Button onClick={handleCloseAddModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>

                <Dialog
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Update Category"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: item ? item.name : '',
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
                                    type: actions.UPDATECLIENTSTYPES,
                                    payload: values,
                                    id: item.id
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
                                            value={values.name}
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
                                <Button onClick={handleCloseEditModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>

                <Dialog
                    open={openDeleteModal}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Delete User"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure for delete ({item ? item.name : ''})?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => categoryDeleteLinkClick({item})} autoFocus color='error'>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Types>
    );
}