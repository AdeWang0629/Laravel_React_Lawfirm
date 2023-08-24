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

  const [value, setValue] = useState('#ffffff')

  const handleChange = (newValue) => {
    setValue(newValue)
  }
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


export default function lawsuitCases({...others}){
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const data = useSelector((state)=> state.lawsuiteReducer);

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    useEffect(()=>{
        dispatch({
            type: actions.GETCASELAWSUITE
        });
    },[]);

    useEffect(()=>{
        setRows(data.lawsuiteCasesData);
    });

    const [row, setRow] = useState();

    const [openAddNewCaseLawsuiteModal, setOpenAddNewCaseLawsuiteModal] = useState(false);
    const addNewCaseLawsuite = () => {
        setOpenAddNewCaseLawsuiteModal(true);
    }
    const handleCloseAddNewCaseLawsuiteModal = () => {
        setOpenAddNewCaseLawsuiteModal(false);
    };

    const [openEditCaseLawsuiteModal, setOpenEditCaseLawsuiteModal] = useState(false);
    const editCaseLawsuite = (row) => {
        setOpenEditCaseLawsuiteModal(true);
        setRow(row);
    }
    const handleCloseEditCategoryModal = () => {
        setOpenEditCaseLawsuiteModal(false);
    };

    const [openDeleteCaseLawsuiteModal, setOpenDeleteCaseLawsuiteModal] = useState(false);
    const deleteCaseLawsuite = (row) => {
        setOpenDeleteCaseLawsuiteModal(true);
        setRow(row);
    }
    const handleCloseDeleteCaseLawsuiteModal = () => {
        setOpenDeleteCaseLawsuiteModal(false);
    };

    const caseLawsuiteDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETECASELAWSUITE,
            payload: data.row.id
        });
        setOpenDeleteCaseLawsuiteModal(false);
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
        setOpenAddNewCaseLawsuiteModal(false);
        setOpenEditCaseLawsuiteModal(false);
        setOpenDeleteCaseLawsuiteModal(false);
    }, [data]);

    const caseTypesDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETECASETYPES,
            payload: data.row.id
        });
    }

    const handleColorChange = (color, setFieldValue) => {
        const hexColor = rgbToHex(color);
        setFieldValue('color', hexColor);
      };
      
    const rgbToHex = (rgbColor) => {
    // Split the RGB color string into individual values
    const rgbValues = rgbColor.slice(4, -1).split(',');
    
    // Convert each RGB value to hexadecimal format
    const hexValues = rgbValues.map((value) => {
        const hexValue = parseInt(value.trim()).toString(16);
        return hexValue.padStart(2, '0');
    });
    
    // Combine the hexadecimal values and add the '#' prefix
    return '#' + hexValues.join('');
    };

    return (
        <Index>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography> Lawsuites categories </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <Button size="small" variant="contained" color='primary' style={{marginRight: 10}} onClick={() => addNewCaseLawsuite()}>
                                Add new case Lawsuite
                                <AddIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            STATUS LAWSUITES
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions status Lawsuites...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">
                                            <Typography>CASE LAWSUITE</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>COLOR</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>CASES COUNTS</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>ACTIONS</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>CREATED DATE</Typography>
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
                                                <Chip label={row.color} size="small" style={{backgroundColor: `${row.color}`, color: 'white', width: '100px'}} />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography color='blue'>
                                                    {row.lawsuites_count}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <EditIcon color="success" style={{ cursor: 'pointer', marginRight: 20}} onClick={()=>editCaseLawsuite(row)}/>
                                                <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => deleteCaseLawsuite(row)} />
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
                    open={openAddNewCaseLawsuiteModal}
                    onClose={handleCloseAddNewCaseLawsuiteModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Add New case Lawsuite"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: '',
                            color: '#ffffff',
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
                                    type: actions.CREATECASELAWSUITE,
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
                                <Grid container columns={{xs:2, sm:8, md:16}} justifyContent='space-between'>
                                    <Grid item xs={2} sm={4} md={7.5}>
                                        <FormControl fullWidth error={Boolean(touched.color && errors.color)} sx={{ ...theme.typography.customInput}}>

                                            <MuiColorInput value={values.color} onChange={(color) => handleColorChange(color, setFieldValue)} onBlur={handleBlur} name='color' id="outlined-adornment-case-lawsuite-color" />

                                            {touched.color && errors.color && (
                                                <FormHelperText error id="outlined-adornment-case-lawsuite-color">
                                                {errors.color}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={7.5}>
                                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-case-lawsuite-name">case Lawsuite</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-case-lawsuite-name"
                                                type="text"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="case Lawsuite"
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
                                <Button onClick={handleCloseAddNewCaseLawsuiteModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>

                <Dialog
                    open={openEditCaseLawsuiteModal}
                    onClose={handleCloseEditCategoryModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Update case Lawsuite"}
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            name: row ? row.name : '',
                            color: row ? row.color: '',
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
                                    type: actions.UPDATECASELAWSUITE,
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
                            <DialogContent>
                                <Grid container columns={{xs:2, sm:8, md:16}} justifyContent='space-between'>
                                    <Grid item xs={2} sm={4} md={7.5}>
                                        <FormControl fullWidth error={Boolean(touched.color && errors.color)} sx={{ ...theme.typography.customInput}}>

                                            <MuiColorInput value={values.color} onChange={(color) => handleColorChange(color, setFieldValue)} onBlur={handleBlur} name='color' id="outlined-adornment-case-lawsuite-color" />

                                            {touched.color && errors.color && (
                                                <FormHelperText error id="outlined-adornment-case-lawsuite-color">
                                                {errors.color}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} sm={4} md={7.5}>
                                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput}}>
                                            <InputLabel htmlFor="outlined-adornment-case-lawsuite-name">case Lawsuite</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-case-lawsuite-name"
                                                type="text"
                                                name="name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="case Lawsuite"
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
                                <Button onClick={handleCloseEditCategoryModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>
                
                <Dialog
                    open={openDeleteCaseLawsuiteModal}
                    onClose={handleCloseDeleteCaseLawsuiteModal}
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
                    <Button onClick={handleCloseDeleteCaseLawsuiteModal}>Cancel</Button>
                    <Button onClick={() => caseLawsuiteDeleteLinkClick({row})} autoFocus color='error'>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Index>
    );
}