import { Index } from './index.styled';
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
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Admin/Lawsuite/actions';

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

import {amber, teal} from '@mui/material/colors';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';

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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function caseTypes({...others}){
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const data = useSelector((state)=> state.lawsuiteReducer);

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    useEffect(()=>{
        dispatch({
            type: actions.GETALLLAWSUITES
        });
    },[]);

    useEffect(()=>{
        // setRows(data.allLawsuitesData);
    });

    const userShowLinkClick = (id) => {
        dispatch({
            type: actions.SHOWUSER,
            payload: id
        });
    }

    const userDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETEUSER,
            payload: data.row.id
        });
        setOpen(false);
    }

    const [open, setOpen] = useState(false);
    const [row, setRow] = useState();

    const handleClickOpen = (row) => {
      setOpen(true);
      setRow(row);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);
    const addNewCategory = () => {
        setOpenAddNewCategoryModal(true);
    }
    const handleCloseAddNewCategoryModal = () => {
        setOpenAddNewCategoryModal(false);
    };

    const [openAddNewCategoryClientModal, setOpenAddNewCategoryClientModal] = useState(false);
    const addNewCategoryClient = () => {
        setOpenAddNewCategoryClientModal(true);
    }
    const handleCloseAddNewCategoryClientModal = () => {
        setOpenAddNewCategoryClientModal(false);
    };

    const [openAddNewCourtModal, setOpenAddNewCourtModal] = useState(false);
    const addNewCourt = () => {
        setOpenAddNewCourtModal(true);
    }
    const handleCloseAddNewCourtModal = () => {
      setOpenAddNewCourtModal(false);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
        <Index>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography>Lawsuites</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <Button size="small" variant="contained" color='primary' style={{marginRight: 10}} onClick={() => addNewCategory()}>
                                Add new category
                                <AddIcon/>
                            </Button>
                            
                            <Button size="small" variant="contained" color='secondary' style={{marginRight: 10, backgroundColor: amber[500]}}>
                                Add new client
                                <AddIcon/>
                            </Button>
                            
                            <Button size="small" variant="contained" style={{marginRight: 10, backgroundColor: teal[500]}} onClick={() => addNewCategoryClient()}> 
                                Add new category client
                                <AddIcon/>
                            </Button>

                            <Button size="small" variant="contained" color='secondary' style={{marginRight: 10}} onClick={() => addNewCourt()}>
                                Add new Court
                                <AddIcon/>
                            </Button>
                            
                            <NavLink to="/lawsuites/create">
                                <Button size="small" variant="contained" color='success'>
                                    Add new Lawsuite
                                    <AddIcon/>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            LAWSUITES
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions Newspapers case...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">
                                            <Typography>LAWSUITE FILE</Typography>
                                            <Typography>NUMBER</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>CLIENT NAME</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>CATEGORY</Typography>
                                            <Typography>LAWSUITE</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>NUMBERS</Typography>
                                            <Typography>SESSIONS</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>CONTRACT</Typography>
                                            <Typography>AMOUNT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>VAT AMOUNT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>ACTIONS</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>PAID</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>REMAINING</Typography>
                                        </StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {(rowsPerPage > 0
                                         ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                       : rows).map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">
                                              <Typography>
                                                {row.case_number}
                                              </Typography>
                                              <Chip label={"primary"} color="primary" size='small' style={{fontSize: '10px', padding: '1px 1px'}}/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                      <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                      </TableRow>
                                    )}
                                    </TableBody>
                                    <TableFooter>
                                      <TableRow>
                                        <TablePagination
                                          rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                          colSpan={3}
                                          count={rows.length}
                                          rowsPerPage={rowsPerPage}
                                          page={page}
                                          SelectProps={{
                                            inputProps: {
                                              'aria-label': 'rows per page',
                                            },
                                            native: true,
                                          }}
                                          onPageChange={handleChangePage}
                                          onRowsPerPageChange={handleChangeRowsPerPage}
                                          ActionsComponent={TablePaginationActions}
                                        />
                                      </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Box>

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
                                        <InputLabel htmlFor="outlined-adornment-name- clients_types_create">Caegory Name</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-name-user_create"
                                            type="text"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Caegory Name"
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

                <Dialog
                    open={openAddNewCourtModal}
                    onClose={handleCloseAddNewCourtModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Add New Court"}
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
                                        <InputLabel htmlFor="outlined-adornment-name- clients_types_create">Court Name</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-name-user_create"
                                            type="text"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            label="Court Name"
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
                                <Button onClick={handleCloseAddNewCourtModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>
            </Box>
        </Index>
    );
}