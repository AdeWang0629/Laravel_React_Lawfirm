import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Create } from './create.styled';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';

export default function create(){
    return (
        <Create>
            <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary">Home</Typography>
                                <Typography color="text.primary">Add new Lawsuite</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" style={{backgroundColor: '#4caf50'}}>
                                Add new Category
                                <AddIcon/>
                            </Button>
                            <Button variant="contained">
                                Add new Category Client
                                <AddIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}}>
                        <Box sx={{flexGrow: 1}}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography color="text.primary">Client Information</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color="text.primary">Choose category Client</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color="text.primary">Choose Client</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Create>
    );
}