import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Index } from './index.styled';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';

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
    const data = useSelector((state)=> state.adminHomeReducer);

    useEffect(()=>{
        dispatch({
            type: actions.GETUSER
        });
    },[]);

    useEffect(()=>{

    });

    return (
        <Index>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Table</Typography>
                                <Typography>Users</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={7.7}>
                        </Grid>
                        <Grid item xs={1.3}>
                            <NavLink to="/users/create">
                                <Button variant="contained" color='secondary'>
                                    Add new User
                                    <AddIcon/>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Typography varient='h4' mb={.5} className='weight-7'>
                            USERS
                        </Typography>
                        <Typography className='text-secondary'>
                            Here you can add or edit and all actions Users...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">FULL NAME</StyledTableCell>
                                        <StyledTableCell align="right">NAME USER</StyledTableCell>
                                        <StyledTableCell align="right">EMAIL</StyledTableCell>
                                        <StyledTableCell align="right">ACTIONS</StyledTableCell>
                                        <StyledTableCell align="right">CREATED DATE</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="right">{row.user_name}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="contained" color="error"><DeleteIcon/></Button>
                                                <Button variant="contained" color="success"><SaveAsIcon/></Button>
                                                <Button variant="contained"><VisibilityIcon/></Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Index>
    );
}