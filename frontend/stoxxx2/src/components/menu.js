import * as React from 'react';

import {
  Toolbar, AppBar, Divider, List, ListItem, Box, CssBaseline,
  ListItemButton, ListItemIcon, ListItemText, IconButton,
  Typography, Drawer
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import StocksOblIcon from '@mui/icons-material/StickyNote2';
import ForexIcon from '@mui/icons-material/CurrencyExchange';
import ComodiesIcon from '@mui/icons-material/Inventory';
import IndexiesEtfIcon from '@mui/icons-material/ShowChart';
import CryptoIcon from '@mui/icons-material/CurrencyBitcoin';
import SettingsIcon from '@mui/icons-material/SettingsApplications';
import InfoIcon from '@mui/icons-material/Info';
import TranslateIcon from '@mui/icons-material/Translate';

import { withTranslation } from 'react-i18next';
import LanguageSelect from './languageSelect';
import { ThemeContext1 } from '../App';

const drawerWidth = 240;

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mobileOpen: false };
  }

  onListClicked = (elem) => {
    console.log(elem);
    window.location.replace("/" + elem);
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    console.log('context', this.context)

    const menu_entries_assets =
      [{ name: 'forex', icon: <ForexIcon /> },
      { name: 'comodies', icon: <ComodiesIcon /> },
      { name: 'indices', icon: <IndexiesEtfIcon /> },
      { name: 'stocks', icon: <StocksOblIcon /> },
      { name: 'crypto', icon: <CryptoIcon /> },
      { name: 'etf', icon: <IndexiesEtfIcon /> },
      { name: 'obligations', icon: <StocksOblIcon /> }];

    const menu_entries_bottom = [
      // [{ name: 'settings', icon: <SettingsIcon /> },
      // { name: 'about', icon: <InfoIcon /> },
    ];

    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {menu_entries_assets.map((obj, index) => (
            <ListItem key={obj.translate} disablePadding>
              <ListItemButton onClick={() => this.onListClicked(obj.name)}>
                <ListItemIcon>
                  {obj.icon}
                </ListItemIcon>
                <ListItemText primary={this.props.t(obj.name)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {menu_entries_bottom.map((obj, index) => (
            <ListItem key={obj.translate} disablePadding>
              <ListItemButton onClick={() => this.onListClicked(obj.name)}>
                <ListItemIcon>
                  {obj.icon}
                </ListItemIcon>
                <ListItemText primary={this.props.t(obj.name)} />
              </ListItemButton>
            </ListItem>

          ))}
        </List> */}
        {/* <Divider /> */}

        <List>
          {/* <ListItem> */}
            <ListItemButton>
              <ListItemIcon>
                <TranslateIcon />
              </ListItemIcon>
              <LanguageSelect />
            </ListItemButton>
          {/* </ListItem> */}
        </List>


      </div>
    );

    const container = document.body;

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              StoxxX
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* <div id="pageplace"> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, p: 2, width: {
              sm: `calc(100% - ${drawerWidth}px)`
            }
          }}
        >
          {this.props.page}
          {this.props.children}
        </Box>
        {/* </div> */}
      </Box>
    );
  }
}

export default withTranslation()(Menu);
