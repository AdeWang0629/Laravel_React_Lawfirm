import * as React from 'react';
import {
    Typography,
    Breadcrumbs,
    Box,
    Grid,
    Stack,
    Button,
    Card,
    Chip
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { grey } from '@mui/material/colors';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../../redux/Admin/User/actions';
import { formate_date } from '../../../helpers';
import { useParams } from 'react-router-dom';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export default function show(){
    const data = useSelector((state)=>state.userReducer);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [userdata, setUserData] = useState([]);
    
    React.useEffect(() => {
        setUserData(data.userData);
    },[data]);

    const aaa = aaa;
    
    React.useEffect(()=>{
        dispatch({
            type: actions.SHOWUSER,
            payload: id, aaa
        });
    },[]);

    if(!userdata){
        return;
    }

    const username_item = (data) => {
        return data.map((item, value) => (
            <Typography key={value} color="#e8b210" marginRight='5' style={{fontSize: 25}}>{item.name}</Typography>
        ));
    }

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper'}}>
                <Box sx={{ flexGrow: 1, bgcolor: grey[100], minHeight: 60 }}>
                    <Grid container columnSpacing={{ xs: 1, sm: 1, md: 3 }} rowSpacing={{ xs: 1, sm: 1, md: 3 }} columns={{xs:2, sm:8, md:16}}>
                        <Grid item sm={8} md={5}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary" variant='h5'>Home</Typography>
                                <Typography>Show user</Typography>
                                <Typography>{userdata.user_name}</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item sm={8} md={6.6}>

                        </Grid>
                        <Grid item sm={8} md={4.4}>
                            <NavLink to={`/users/${id}/edit`}>
                                <Button variant="contained" color='secondary' style={{marginRight: 10, marginBottom: 10}}>
                                    Edit User
                                    <SupervisedUserCircleIcon />
                                </Button>
                            </NavLink>

                            <NavLink to="/users">
                                <Button variant="contained" style={{marginRight: 10, marginBottom: 10}}>
                                    Back to Users
                                    <KeyboardBackspaceIcon />
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Card xs={{display: 'flex'}} style={{padding: '20px 20px'}}>
                        <Stack>
                            <Stack direction="row" alignItems='center'>
                                <Typography variant="overline" color="primary" style={{fontSize: 30, fontWeight: '700', marginRight: '10'}}>Full Name: {userdata.first_name} {userdata.last_name}</Typography>
                                {
                                    userdata.status == 1 ?
                                    (<Chip label="Acitve" color="success" size="small" style={{width: 60, marginTop: 10}} />) :
                                    (<Chip label="InActive" color="primary" size="small" variant="outlined" style={{width: 80}} />)
                                }
                            </Stack>

                            <Stack color='red' style={{fontSize: 50, marginBottom: 50}}>
                                <Stack direction="row" alignItems='center'>
                                    <Typography marginRight='10' style={{fontSize: 20}}>User: {userdata.user_name} </Typography>
                                    <Typography color='#e8b210' style={{fontSize: 25}}>(</Typography>    
                                    { userdata.roles ? username_item(userdata.roles) : ''}
                                    <Typography color='#e8b210' style={{fontSize: 25}}>)</Typography>  
                                </Stack>

                                <Typography style={{fontSize: 20}}>Email: {userdata.email} </Typography>
                                <Typography style={{fontSize: 20}}>Created date: {formate_date(userdata.created_at)} </Typography>
                            </Stack>


                            <TreeView
                                aria-label="file system navigator"
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                                >
                                <TreeItem nodeId="1" label={<Typography sx={{ fontSize: 18, fontWeight: '600' }}>Roles</Typography>}>
                                    <TreeItem nodeId="2" label="There is no Roles Yet" />
                                </TreeItem>
                            </TreeView>
                        </Stack>
                    </Card>
                </Box>
            </Box>
        </>
    );
}