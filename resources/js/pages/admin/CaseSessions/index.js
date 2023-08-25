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
import actions from '../../../redux/Admin/CaseSession/actions';

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


export default function ({...others}){
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const data = useSelector((state)=> state.caseSessionReducer);

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    useEffect(()=>{
        dispatch({
            type: actions.GETCASESESSIONS
        });
    },[]);

    useEffect(()=>{
        setRows(data.caseSessionsData);
    });

    const [row, setRow] = useState();

    const [openEditStageLitigationModal, setOpenEditStageLitigationModal] = useState(false);
    const editStageLitigation = (row) => {
        setOpenEditStageLitigationModal(true);
        setRow(row);
    }
    const handleCloseEditStageLitigationModal = () => {
        setOpenEditStageLitigationModal(false);
    };

    const [openDeleteStageLitigationModal, setOpenDeleteStageLitigationModal] = useState(false);
    const deleteStageLitigation = (row) => {
        setOpenDeleteStageLitigationModal(true);
        setRow(row);
    }
    const handleCloseDeleteStageLitigationModal = () => {
        setOpenDeleteStageLitigationModal(false);
    };

    const stageLitigationDeleteLinkClick = (data) => {
        dispatch({
            type: actions.DELETECASESTAGES,
            payload: data.row.id
        });
        setOpenDeleteStageLitigationModal(false);
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
        setOpenEditStageLitigationModal(false);
        setOpenDeleteStageLitigationModal(false);
    }, [data]);

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography> Sessions</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <NavLink to="/lawsuites">
                                <Button size="small" variant="contained" color='success' style={{marginRight: 10}}>
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
                            SESSIONS
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions SESSIONS...
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
                                                <Stack justifyContent="center" alignItems="center">
                                                    <Typography color='red'>
                                                        {row.lawsuite.case_number}
                                                    </Typography>
                                                    <Stack  direction='row'>
                                                        <Typography>
                                                            Client Name:
                                                        </Typography>
                                                        <Typography>
                                                            
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography color='blue'>
                                                    {row.lawsuite.case_number}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography color='blue'>
                                                    {row.lawsuite.case_number}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <EditIcon color="success" style={{ cursor: 'pointer', marginRight: 20}} onClick={()=> editStageLitigation(row)}/>
                                                <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => deleteStageLitigation(row)} />
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
                    open={openEditStageLitigationModal}
                    onClose={handleCloseEditStageLitigationModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Update Court"}
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
                                    type: actions.UPDATECASESTAGES,
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
                                <Button onClick={handleCloseEditStageLitigationModal}>Cancel</Button>
                                <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="secondary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                        )}
                    </Formik>
                </Dialog>
                
                <Dialog
                    open={openDeleteStageLitigationModal}
                    onClose={handleCloseDeleteStageLitigationModal}
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
                    <Button onClick={handleCloseDeleteStageLitigationModal}>Cancel</Button>
                    <Button onClick={() => stageLitigationDeleteLinkClick({row})} autoFocus color='error'>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </>
    );
}