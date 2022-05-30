import React, { useEffect, useState } from 'react';
import ScanGrid from './components/ScanGrid';
import { CssBaseline, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import HeaderTitle from './components/HeaderTitle';

import DiscordButton from './components/DiscordButton';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import MuiDrawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';

const drawerWidth = 240;

const parseCSV = (text) => {
  const [headers, ...rows] = text.split('\n')
  const parsedHeaders = headers.split(',')
  const parsedRows = []
  rows.forEach((row) => {
    parsedRows.push(row.split(','))
  })
  return {
    headers: parsedHeaders,
    rows: parsedRows,
  };
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function App() {
  const [state, setState] = useState({
    csv: null,
    open: true,
  });

  useEffect(() => {
    if (state.csv == null) {
      fetch('scans/20220527.csv')
        .then(r => r.text())
        .then((text) => {
          setState({...state, csv: parseCSV(text)})
        })
    }
  }, []);

  const toggleDrawer = () => {
    setState({...state, open: !state.open});
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex', flexDirection: "column", height: '100vh', overflow: 'hidden'}}>
        <CssBaseline />
        <AppBar position="sticky">
          <Toolbar
            sx={{ pr: '24px' }}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '18px'
                }}>
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <HeaderTitle />
                <DiscordButton />
              </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexDirection: "row"}}>
          <Drawer variant="permanent" open={state.open}>
            <Divider />
            <List component="nav">
              <React.Fragment>
                <ListItemButton>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scans" />
                </ListItemButton>
              </React.Fragment>
            </List>
          </Drawer>
          <Box
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'scroll',
            }}>
            <ScanGrid csv={state.csv} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
