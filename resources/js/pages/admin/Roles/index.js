import { Index } from './index.styled';
import {
    Typography,
    Breadcrumbs,
    Button,
    Card,
    Chip,
    Link
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
import actions from '../../../redux/Admin/User/actions';

import { grey } from '@mui/material/colors';

import { NavLink } from 'react-router-dom';

import { username_item, formate_date } from '../../../helpers';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function index(){
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const data = useSelector((state)=> state.userReducer);

    useEffect(()=>{
        dispatch({
            type: actions.GETUSERS
        });
    },[]);

    useEffect(()=>{
        setRows(data.usersData);
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

    return (
        <Index>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60}}>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography>Roles</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item style={{marginBottom: 10}}>
                            <NavLink to="/users/create">
                                <Button variant="contained" color='secondary'>
                                    Add new Role
                                    <AddIcon/>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            Roles
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions Users...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">#</StyledTableCell>
                                        <StyledTableCell align="center">ROLE NAME</StyledTableCell>
                                        <StyledTableCell align="center">NUMBERS USERS</StyledTableCell>
                                        <StyledTableCell align="center">ACTIONS</StyledTableCell>
                                        <StyledTableCell align="center">CREATED DATE</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row, index) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">
                                                <Typography>
                                                    {index}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography>

                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {/* <VisibilityIcon color="secondary" style={{ cursor: 'pointer', marginRight: 10}} onClick={() => userShowLinkClick(row.id)}/>
                                                <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(row)} /> */}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {/* {formate_date(row.created_at)} */}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Box>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Delete User"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure for delete ({row ? row.user_name : ''})?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => userDeleteLinkClick({row})} autoFocus color='error'>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Index>
    );
}