import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Index } from './index.styled';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/Admin/Home/actions';


import { CustomCard } from '../../../components/CustomCard';

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

export default function index() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = useState([]);
  const data = useSelector((state)=> state.adminHomeReducer);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({
      type: actions.GETHOME,
    });
    
  },[]);

  useEffect(()=>{
    setRows(data.lawsuites);
  });

  return (
    <Index>
      <Box sx={{ bgcolor: 'background.paper', padding: '10px 20px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={{xs: 2, sm: 8, md: 16}}>
            <Grid item xs={2} sm={8} md={12.8}>
              <Stack mt={2}>
                <Typography variant='h4'>Hi, welcome back! <span className='orange'>{user.username}</span></Typography>
                <Typography className='text-secondary'>Here are some quick statistics</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2} sm={6.2} md={2.1}>
              <Stack mt={2}>              
                <Typography className='text-secondary'>Consultation counts</Typography>
                <Typography variant='h5' className='text-secondary weight-7'>{data.consultationsCount}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2} sm={1.8} md={1.1}>
              <Stack mt={2}>
                <Typography className='text-secondary'>Cases counts</Typography>
                <Typography variant='h5' className='text-secondary weight-7'>{data.caseSessionCount}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }} mt={5}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs:2, sm:8, md:16}}>
            <Grid item xs={2} sm={4} md={4}>
              <CustomCard bg_l_color='#0db2de 0%' bg_r_color='#005bea 100%' h_text='Payments Lawsuites' c_text={data.lawsuitesPayments} />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <CustomCard bg_l_color='#48d6a8 0%' bg_r_color='#029666' h_text='Payments Consultations' c_text={data.consultationPayments} />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <CustomCard bg_l_color='#f93a5a' bg_r_color='#f7778c' h_text='Numbers Clients' c_text={data.consultationPayments} />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <CustomCard bg_l_color='#efa65f' bg_r_color='#f76a2d' h_text='Numbers Sessions' c_text={data.caseSessionCount} />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }} mt={5}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{xs: 6, sm: 12, md: 24}}>
            <Grid item xs={6} sm={4} md={8}>
              <Card style={{height: '100%'}} className='p-2'>
                <Stack mb={1}>
                  <Typography varient='h4' mb={.5} className='weight-7'>
                  LAST OF PAYMENTS
                  </Typography>
                  <Typography className='text-secondary'>
                    Here you will find the last Payments
                  </Typography>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={6} sm={8} md={16}>
              <Card xs={{display: 'flex'}} className='p-2'>
                <Stack mb={1}>
                  <Typography varient='h4' mb={.5} className='weight-7'>
                    LAST OF LAWSUITES
                  </Typography>
                  <Typography className='text-secondary'>
                    Here you will find the last Lawsuites
                  </Typography>
                </Stack>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="right">COURT</StyledTableCell>
                        <StyledTableCell align="right">NAME CLIENT</StyledTableCell>
                        <StyledTableCell align="right">CATEGORY LAWSUITE</StyledTableCell>
                        <StyledTableCell align="right">LAWSUITE FILE NUMBER</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows ? rows.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell align="right">{row.case_number}</StyledTableCell>
                          <StyledTableCell align="right">{row.client.name}</StyledTableCell>
                          <StyledTableCell align="right">{row.case_type.name}</StyledTableCell>
                          <StyledTableCell align="right">{row.court.name}</StyledTableCell>
                        </StyledTableRow>
                      )) : null}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Index>
  );
}
