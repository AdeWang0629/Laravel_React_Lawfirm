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
import actions from '../../../redux/Admin/Expenses/actions';

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
import {MuiColorInput} from 'mui-color-input'; 
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


export default function SessionReports({...others}){
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const data = useSelector((state)=> state.expensesReducer);

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    useEffect(()=>{
        dispatch({
            type: actions.GETEXPENSESECTIONS
        });
    },[]);

    useEffect(()=>{
        setRows(data.expenseSectionsData);
    });

    const [row, setRow] = useState();

    const [openAddNewExpenseSectionsModal, setOpenAddNewExpenseSectionsModal] = useState(false);
    const addNewExpenseSections = () => {
        setOpenAddNewExpenseSectionsModal(true);
    }
    const handleCloseAddNewExpenseSectionsModal = () => {
        setOpenAddNewExpenseSectionsModal(false);
    };

    const [openEditExpenseSectionsModal, setOpenEditExpenseSectionsModal] = useState(false);
    const editExpenseSections = (row) => {
        setOpenEditExpenseSectionsModal(true);
        setRow(row);
    }
    const handleCloseEditExpenseSectionsModal = () => {
        setOpenEditExpenseSectionsModal(false);
    };

    const [openDeleteExpenseSectionsModal, setOpenDeleteExpenseSectionsModal] = useState(false);
    const deleteExpenseSections = (row) => {
        setOpenDeleteExpenseSectionsModal(true);
        setRow(row);
    }
    const handleCloseDeleteExpenseSectionsModal = () => {
        setOpenDeleteExpenseSectionsModal(false);
    };

    const expenseSectionsDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETEEXPENSESECTIONS,
            payload: data.row.id
        });
        setOpenDeleteExpenseSectionsModal(false);
    }

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

    useEffect(()=>{
        setRow('');
        setOpenAddNewExpenseSectionsModal(false);
        setOpenEditExpenseSectionsModal(false);
        setOpenDeleteExpenseSectionsModal(false);
    }, [data]);

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography> Reports Sessions </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <Button size="small" variant="contained" color='primary' style={{marginRight: 10}} onClick={() => addNewExpenseSections()}>
                                Add new Sections Expenses
                                <AddIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            SECTIONS EXPENSES
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions Sections Expenses...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">
                                            <Typography>LAWSUITE FILE NUMBER</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>CLIENT NAME</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>TITLE SESSION</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>DATE SESSION</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>COURT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>ACTIONS</Typography>
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
                                                    {row.name}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.payments.length}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.payments.reduce((total, payment) => total + payment.debit, 0)}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <EditIcon color="success" style={{ cursor: 'pointer', marginRight: 20}} onClick={()=> editExpenseSections(row)}/>
                                                <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => deleteExpenseSections(row)} />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {formate_date(row.created_at)}
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
                    open={openAddNewExpenseSectionsModal}
                    onClose={handleCloseAddNewExpenseSectionsModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Add new Section Expenses"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Branch is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                dispatch({
                                    type: actions.CREATEEXPENSESECTIONS,
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
                            <DialogContent style={{width: '600px'}}>
                                <Grid container columns={{xs:2, sm:8, md:16}}>
                                    <Grid item xs={2} sm={8} md={16}>
                                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-case-lawsuite-name">Section Expenses</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-case-lawsuite-name"
                                                type="text"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Branch"
                                                inputProps={{}}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText error id="outlined-adornment-case-lawsuite-name">
                                                {errors.name}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAddNewExpenseSectionsModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>

                <Dialog
                    open={openEditExpenseSectionsModal}
                    onClose={handleCloseEditExpenseSectionsModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Expenses Section Update"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: row ? row.name : '',
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
                                    type: actions.UPDATEEXPENSESECTIONS,
                                    payload: values,
                                    id: row.id
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
                            <DialogContent style={{width: '600px'}}>
                                <Grid container columns={{xs:2, sm:8, md:16}}>
                                    <Grid item xs={2} sm={8} md={16}>
                                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-case-lawsuite-name">Section Expenses</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-case-lawsuite-name"
                                                type="text"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Section Expenses"
                                                value={values.name}
                                                inputProps={{}}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText error id="outlined-adornment-case-lawsuite-name">
                                                {errors.name}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEditExpenseSectionsModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>
                
                <Dialog
                    open={openDeleteExpenseSectionsModal}
                    onClose={handleCloseDeleteExpenseSectionsModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Delete User"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure for delete ({row ? row.name : ''})?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDeleteExpenseSectionsModal}>Cancel</Button>
                    <Button onClick={() => expenseSectionsDeleteLinkClick({row})} autoFocus color='error'>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </>
    );
}