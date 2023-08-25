import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import Person4Icon from '@mui/icons-material/Person4';
import GavelIcon from '@mui/icons-material/Gavel';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MoneyIcon from '@mui/icons-material/Money';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useHistory } from 'react-router-dom';


export default function Sidebar({open}) {
  const history = useHistory();
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const routes = [
    "/home",
    "/calendar",
    "/users",
    '/roles',
    '/clients-types',
    '/clients',
    '/lawsuites/create',
    '/lawsuites',
    '/lawsuites-papers',
    '/case-types',
    '/lawsuit-cases',
    '/courts',
    '/case-stages',
    '/lawsuites-status/1',
    '/lawsuites-status/2',
    '/lawsuites-status/3',
    '/lawsuites-status/4',
    '/lawsuites-status/5',
    '/receipts/lawsuites',
    '/case-sessions',
    '/documents',
    '/consultations/create',
    '/consultations',
    '/receipts/consultations',
    '/branches'
  ];

  const user = JSON.parse(localStorage.getItem('user'));

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    routes.map((values, number)=>{
      if (number == index ) {
        history.replace(values);
      }
    });
  };
  
  const [open_client, setOpenC] = React.useState(false);
  const [open_law, setOpenL] = React.useState(false);
  const [open_status, setOpenS] = React.useState(false);
  const [open_consultation, setOpenCon] = React.useState(false);
  const [open_expenses, setOpenExp] = React.useState(false);
  const [open_reports, setOpenRep] = React.useState(false);
  const [open_settings, setOpenSet] = React.useState(false);

  const handleClick = (event, index) => {
    if (index == "open_client") {
      setOpenC(!open_client);
    }else if (index == "open_law") {
      setOpenL(!open_law);
    }else if (index == "open_status") {
      setOpenS(!open_status);
    }else if (index == "open_consultation") {
      setOpenCon(!open_consultation);
    }else if (index == "open_expenses") {
      setOpenExp(!open_expenses);
    }else if (index == "open_reports") {
      setOpenRep(!open_reports);
    }else if (index == "open_settings") {
      setOpenSet(!open_settings);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', minHeight: '90vh' }}>
      <List component="nav" aria-label="main mailbox folders" style={{textAlign: 'center'}}>
        { 
          open ? (
            <Box sx={{minHeight: 172, paddingTop: 2}}>
              <Avatar sx={{ width: 80, height: 80, margin: 'auto', fontSize: 70 }}>H</Avatar>
              <Typography>{user.username}</Typography>
              <Typography>{user.email}</Typography>
              <Typography>Admin</Typography>
            </Box>
          ) : (
            <Box sx={{minHeight: 172, paddingTop: 5}}>
              <Avatar sx={{ width: 40, height: 40, margin: 'auto', fontSize: 30, marginTop: 1 }}>H</Avatar>
              <Typography>Admin</Typography>
            </Box>
          )
        }
      </List>

      <Divider />

      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <EditCalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Roles" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={(event) => handleClick(event, "open_client")}>
          <ListItemIcon>
            <Person4Icon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
          {open_client ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_client} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="category" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="All Clients" />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />

        <ListItemButton onClick={(event) => handleClick(event, "open_law")}>
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Lawsuites" />
          {open_law ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_law} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Add new Lawsuite" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="All Lawsuites" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 8}
              onClick={(event) => handleListItemClick(event, 8)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="All Newspapers case" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 9}
              onClick={(event) => handleListItemClick(event, 9)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="categores" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 10}
              onClick={(event) => handleListItemClick(event, 10)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="status Lawsuites" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Courts" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Stages Litigation" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={(event) => handleClick(event, "open_status")}>
          <ListItemIcon>
            <BatteryStdIcon />
          </ListItemIcon>
          <ListItemText primary="Case by status" />
          {open_status ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_status} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 13}
              onClick={(event) => handleListItemClick(event, 13)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="finished" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 14}
              onClick={(event) => handleListItemClick(event, 14)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="suspended" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 15}
              onClick={(event) => handleListItemClick(event, 15)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="under studying" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 16}
              onClick={(event) => handleListItemClick(event, 16)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="rejected" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 17}
              onClick={(event) => handleListItemClick(event, 17)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="root" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          selected={selectedIndex === 18}
          onClick={(event) => handleListItemClick(event, 18)}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Payments Lawsuites" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 19}
          onClick={(event) => handleListItemClick(event, 19)}
        >
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="All Sessions" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 20}
          onClick={(event) => handleListItemClick(event, 20)}
        >
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary="All Documents" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={(event) => handleClick(event, "open_consultation")}>
          <ListItemIcon>
            <QuestionMarkIcon />
          </ListItemIcon>
          <ListItemText primary="Consultations" />
          {open_consultation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_consultation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 21}
              onClick={(event) => handleListItemClick(event, 21)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Add new Consultation" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 22}
              onClick={(event) => handleListItemClick(event, 22)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="All Consultations" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          selected={selectedIndex === 23}
          onClick={(event) => handleListItemClick(event, 23)}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Payments Consultations" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={(event) => handleClick(event, "open_expenses")}>
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
          {open_expenses ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_expenses} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 24}
              onClick={(event) => handleListItemClick(event, 24)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Branches" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 25}
              onClick={(event) => handleListItemClick(event, 25)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Sections Expenses" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 26}
              onClick={(event) => handleListItemClick(event, 26)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Expenses" />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />

        <ListItemButton onClick={(event) => handleClick(event, "open_reports")}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {open_reports ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_reports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 27}
              onClick={(event) => handleListItemClick(event, 27)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Reports Sessions" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 28}
              onClick={(event) => handleListItemClick(event, 28)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Reports Lawsuites" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 29}
              onClick={(event) => handleListItemClick(event, 29)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Reports Clients" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 30}
              onClick={(event) => handleListItemClick(event, 30)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Reports Payments Lawsuites" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 31}
              onClick={(event) => handleListItemClick(event, 31)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Reports Payments Consultations" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 32}
              onClick={(event) => handleListItemClick(event, 32)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Reports Expenses" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />

        <ListItemButton onClick={(event) => handleClick(event, "open_settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Advanced Settings" />
          {open_settings ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_settings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedIndex === 33}
              onClick={(event) => handleListItemClick(event, 33)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 34}
              onClick={(event) => handleListItemClick(event, 34)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="Backups" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}