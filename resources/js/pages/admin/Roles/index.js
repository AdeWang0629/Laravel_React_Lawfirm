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

function createData(calories, fat, carbs, protein) {
  return { calories, fat, carbs, protein};
}

const rows = [
  createData(159, 6.0, 24, 4.0),
  createData(237, 9.0, 37, 4.3),
  createData(262, 16.0, 24, 6.0),
  createData(305, 3.7, 67, 4.3),
  createData(356, 16.0, 49, 3.9),
];
//Table Style

export default function index(){
    return (
        <Index>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary">Roles</Typography>
                                <Typography color="text.primary">users</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={7.7}>
                        </Grid>
                        <Grid item xs={1.3}>
                            <Button variant="contained" style={{backgroundColor: '#4caf50'}}>
                                Add new Role
                                <AddIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}}>
                        <Typography>
                            ROLES
                        </Typography>
                        <Typography>
                            Here you can add or edit and all actions roles...
                        </Typography>

                        <Box mt={5}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">#</StyledTableCell>
                                        <StyledTableCell align="right">NAME ROLE</StyledTableCell>
                                        <StyledTableCell align="right">NUMBERS USERS</StyledTableCell>
                                        <StyledTableCell align="right">ACTIONS</StyledTableCell>
                                        <StyledTableCell align="right">CREATED DATE</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.calories}>
                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="contained" color="error"><DeleteIcon/></Button>
                                                <Button variant="contained" color="success"><SaveAsIcon/></Button>
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