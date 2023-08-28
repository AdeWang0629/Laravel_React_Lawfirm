import {
    Typography,
    Breadcrumbs,
    Button,
    Card,
    Autocomplete,
    TextField,
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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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


export default function Payments({...others}){
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const data = useSelector((state)=> state.expensesReducer);
    
    const branchesData = useSelector((state) => state.expensesReducer.branchesData);
    const expenseSectionsData = useSelector((state) => state.expensesReducer.expenseSectionsData)

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [value, setValue] = useState(dayjs('2000-01-01'));

    useEffect(()=>{
        dispatch({
            type: actions.GETPAYMENTS
        });
    },[]);

    useEffect(()=>{
        setRows(data.paymentsData);
    });

    const [row, setRow] = useState();
    console.log(row);
    const [openAddNewExpenseModal, setOpenAddNewExpenseModal] = useState(false);
    const addNewExpense = () => {
        setOpenAddNewExpenseModal(true);
    }
    const handleCloseAddNewExpenseModal = () => {
        setOpenAddNewExpenseModal(false);
    };

    const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);
    const editExpense = (row) => {
        setOpenEditExpenseModal(true);
        setRow(row);
    }
    const handleCloseEditExpenseModal = () => {
        setOpenEditExpenseModal(false);
    };

    const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState(false);
    const deleteExpense = (row) => {
        setOpenDeleteExpenseModal(true);
        setRow(row);
    }
    const handleCloseDeleteExpenseModal = () => {
        setOpenDeleteExpenseModal(false);
    };

    const expenseDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETEPAYMENTS,
            payload: data.row.id
        });
        setOpenDeleteExpenseModal(false);
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
        setOpenAddNewExpenseModal(false);
        setOpenEditExpenseModal(false);
        setOpenDeleteExpenseModal(false);
    }, [data]);

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography> Expenses </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <Button size="small" variant="contained" color='primary' style={{marginRight: 10}} onClick={() => addNewExpense()}>
                                Add new Expense
                                <AddIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            EXPENSES
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
                                            <Typography>#</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>RECEIVER</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>SECTION</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>BRANCH</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>PAID AMOUNT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>DATE PAYMENT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>THAT'S ABOUT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>DATE PAYMENT</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>DATE PAYMENT</Typography>
                                        </StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {(rowsPerPage > 0
                                         ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                       : rows).map((row, index) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {index}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.receiver}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.expense_section.name}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.branch.name}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.debit}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.date}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {row.note}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <EditIcon color="success" style={{ cursor: 'pointer', marginRight: 20}} onClick={()=> editExpense(row)}/>
                                                <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => deleteExpense(row)} />
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
                    open={openAddNewExpenseModal}
                    onClose={handleCloseAddNewExpenseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Add new Expense"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            receiver: '',
                            expense_section_id: '',
                            branch_id: '',
                            debit: '',
                            date: value,
                            payment_type: '',
                            note: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            receiver: Yup.string().required("Receiver is required"),
                            expense_section_id: Yup.string().required('Expense section is required'),
                            branch_id: Yup.string().required('Branch is required'),
                            debit: Yup.number().required('Debit is required'),
                            payment_type: Yup.string().required('Payment way is required'),
                            note: Yup.string().required('Note is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                
                                const expense_section_data = expenseSectionsData.filter((item)=>item.name == values.expense_section_id);
                                values.expense_section_id = expense_section_data[0].id;                  
                                
                                const branches_data = branchesData.filter((item)=>item.name == values.branch_id);
                                values.branch_id = branches_data[0].id;         
                                
                                dispatch({
                                    type: actions.CREATEPAYMENTS,
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
                        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, setValues, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <DialogContent>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:3, sm:9, md:12}} sx={{width: '1000px'}}>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.receiver && errors.receiver)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-case-receiver"
                                            >Receiver</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-case-receiver"
                                                type="text"
                                                name="receiver"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Receiver"
                                                inputProps={{}}
                                            />
                                            {touched.receiver && errors.receiver && (
                                                <FormHelperText error id="outlined-adornment-case-receiver">
                                                {errors.receiver}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.expense_section_id && errors.expense_section_id)} sx={{ ...theme.typography.customInput}}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-expense_section_id"
                                                name="expense_section_id"
                                                onBlur={handleBlur}
                                                options={expenseSectionsData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) =>    <TextField 
                                                    {...params}     label="Choose"
                                                    error={Boolean(touched.expense_section_id && errors.expense_section_id)}
                                                    helperText={touched.expense_section_id && errors.expense_section_id}
                                                />}
                                                value={expenseSectionsData.find((option) => option.name === values.expense_section_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('expense_section_id', newValue ? newValue.name : '');
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.branch_id && errors.branch_id)} sx={{ ...theme.typography.customInput}}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-branch_id"
                                                name="branch_id"
                                                onBlur={handleBlur}
                                                options={branchesData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) =>    <TextField 
                                                    {...params}     label="Choose"
                                                    error={Boolean(touched.branch_id && errors.branch_id)}
                                                    helperText={touched.branch_id && errors.branch_id}
                                                />}
                                                value={branchesData.find((option) => option.name === values.branch_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('branch_id', newValue ? newValue.name : '');
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.debit && errors.debit)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="standard-weight-helper-text-debit">Paid amount</InputLabel>
                                            <OutlinedInput
                                                id="standard-weight-helper-text-debit"
                                                type="number"
                                                name="debit"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Paid amount"
                                                inputProps={{}}
                                            />
                                            {touched.debit && errors.debit && (
                                                <FormHelperText error id="standard-weight-helper-text-debit">
                                                {errors.debit}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl error={Boolean(touched.date && errors.date)} sx={{ ...theme.typography.customInput, width: '100%', mt: -1}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Controlled picker"
                                                        name="date"
                                                        value={values.date}
                                                        onChange={(newValue) => {
                                                            const formattedDate = newValue.toISOString().split('T')[0];
                                                            setValues({ ...values, date: formattedDate });
                                                        }}
                                                        sx={{width: '100%'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.payment_type && errors.payment_type)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="standard-weight-helper-text-payment_type">Payment way</InputLabel>
                                            <OutlinedInput
                                                id="standard-weight-helper-text-payment_type"
                                                type="text"
                                                name="payment_type"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Payment way"
                                                inputProps={{}}
                                            />
                                            {touched.payment_type && errors.payment_type && (
                                                <FormHelperText error id="standard-weight-helper-text-payment_type">
                                                {errors.payment_type}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={9} md={12}>
                                        <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="standard-weight-helper-text-note">That's about</InputLabel>
                                            <OutlinedInput
                                                id="standard-weight-helper-text-note"
                                                type="text"
                                                name="note"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="That's about"
                                                inputProps={{}}
                                            />
                                            {touched.note && errors.note && (
                                                <FormHelperText error id="standard-weight-helper-text-note">
                                                {errors.note}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAddNewExpenseModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>

                <Dialog
                    open={openEditExpenseModal}
                    onClose={handleCloseEditExpenseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Update Receipt"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            receiver: row ? row.receiver : '',
                            expense_section_id: row ? row.expense_section.name : '',
                            branch_id: row ? row.branch.name : '',
                            debit: row ? row.debit : '',
                            date: row ? dayjs(row.date) : '',
                            payment_type: row ? row.payment_type : '',
                            note: row ? row.note : '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            receiver: Yup.string().required("Receiver is required"),
                            expense_section_id: Yup.string().required('Expense section is required'),
                            branch_id: Yup.string().required('Branch is required'),
                            debit: Yup.number().required('Debit is required'),
                            payment_type: Yup.string().required('Payment way is required'),
                            note: Yup.string().required('Note is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);

                                const expense_section_data = expenseSectionsData.filter((item)=>item.name == values.expense_section_id);
                                values.expense_section_id = expense_section_data[0].id;                  
                                
                                const branches_data = branchesData.filter((item)=>item.name == values.branch_id);
                                values.branch_id = branches_data[0].id;         
                                
                                if(typeof values.date !== 'string'){
                                    values.date = values.date.toISOString().split('T')[0];
                                }

                                dispatch({
                                    type: actions.UPDATEPAYMENTS,
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
                        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, setValues, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <DialogContent>
                                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:3, sm:9, md:12}} sx={{width: '1000px'}}>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.receiver && errors.receiver)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-case-receiver"
                                            >Receiver</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-case-receiver"
                                                type="text"
                                                name="receiver"
                                                value={values.receiver}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="Receiver"
                                                inputProps={{}}
                                            />
                                            {touched.receiver && errors.receiver && (
                                                <FormHelperText error id="outlined-adornment-case-receiver">
                                                {errors.receiver}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.expense_section_id && errors.expense_section_id)} sx={{ ...theme.typography.customInput}}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-expense_section_id"
                                                name="expense_section_id"
                                                onBlur={handleBlur}
                                                options={expenseSectionsData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) =>    <TextField 
                                                    {...params}     label="Choose"
                                                    error={Boolean(touched.expense_section_id && errors.expense_section_id)}
                                                    helperText={touched.expense_section_id && errors.expense_section_id}
                                                />}
                                                value={expenseSectionsData.find((option) => option.name === values.expense_section_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('expense_section_id', newValue ? newValue.name : '');
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.branch_id && errors.branch_id)} sx={{ ...theme.typography.customInput}}>
                                            <Autocomplete
                                                disablePortal
                                                id="standard-weight-helper-text-branch_id"
                                                name="branch_id"
                                                onBlur={handleBlur}
                                                options={branchesData}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) =>    <TextField 
                                                    {...params}     label="Choose"
                                                    error={Boolean(touched.branch_id && errors.branch_id)}
                                                    helperText={touched.branch_id && errors.branch_id}
                                                />}
                                                value={branchesData.find((option) => option.name === values.branch_id) || null}
                                                onChange={(event, newValue) => {
                                                    setFieldValue('branch_id', newValue ? newValue.name : '');
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.debit && errors.debit)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="standard-weight-helper-text-debit">Paid amount</InputLabel>
                                            <OutlinedInput
                                                id="standard-weight-helper-text-debit"
                                                type="number"
                                                name="debit"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.debit}
                                                label="Paid amount"
                                                inputProps={{}}
                                            />
                                            {touched.debit && errors.debit && (
                                                <FormHelperText error id="standard-weight-helper-text-debit">
                                                {errors.debit}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl error={Boolean(touched.date && errors.date)} sx={{ ...theme.typography.customInput, width: '100%', mt: -1}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Controlled picker"
                                                        name="date"
                                                        value={values.date}
                                                        onChange={(newValue) => {
                                                            const formattedDate = newValue.toISOString().split('T')[0];
                                                            setValues({ ...values, date: formattedDate });
                                                        }}
                                                        sx={{width: '100%'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={4}>
                                        <FormControl fullWidth error={Boolean(touched.payment_type && errors.payment_type)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="standard-weight-helper-text-payment_type">Payment way</InputLabel>
                                            <OutlinedInput
                                                id="standard-weight-helper-text-payment_type"
                                                type="text"
                                                name="payment_type"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.payment_type}
                                                label="Payment way"
                                                inputProps={{}}
                                            />
                                            {touched.payment_type && errors.payment_type && (
                                                <FormHelperText error id="standard-weight-helper-text-payment_type">
                                                {errors.payment_type}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3} sm={9} md={12}>
                                        <FormControl fullWidth error={Boolean(touched.note && errors.note)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="standard-weight-helper-text-note">That's about</InputLabel>
                                            <OutlinedInput
                                                id="standard-weight-helper-text-note"
                                                type="text"
                                                name="note"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.note}
                                                label="That's about"
                                                inputProps={{}}
                                            />
                                            {touched.note && errors.note && (
                                                <FormHelperText error id="standard-weight-helper-text-note">
                                                {errors.note}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEditExpenseModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>
                
                <Dialog
                    open={openDeleteExpenseModal}
                    onClose={handleCloseDeleteExpenseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Delete User"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure for delete ({row ? row.receiver : ''})?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDeleteExpenseModal}>Cancel</Button>
                    <Button onClick={() => expenseDeleteLinkClick({row})} autoFocus color='error'>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </>
    );
}