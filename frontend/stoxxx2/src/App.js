import logo from './logo.svg';
import './App.css';
// import { useTranslation } from 'react-i18next';
import { Toolbar } from '@mui/material';
import { Routes, Route } from "react-router-dom";

import Menu from './components/menu';
import SettingsPage from './components/settingsPage';
import AboutPage from './components/aboutPage';
import SearchPage from './components/searchPage';
import React from 'react';
import StatsPage from './components/statsPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  // const { t } = useTranslation();

  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        <Toolbar />
        <div className="App">
        <Menu>
          <Routes>
            
            <Route path="/settings" element={<Menu page={<SettingsPage />} />} />
            <Route path="/about" element={<Menu page={<AboutPage />} />} />

            {/* "indices, stocks, etfs, funds, commodities,
           currencies, cryptos, bonds, certificates, fxfutures" */}

            <Route path="/forex" element={<SearchPage category="currencies" />}/>
            <Route path="/comodies" element=
              {<Menu page={<SearchPage category="commodities" />} />} />
            <Route path="/indices" element=
              {<Menu page={<SearchPage category="indices" />} />} />
            <Route path="/stocks" element=
              {<Menu page={<SearchPage category="stocks" />} />} />
            <Route path="/crypto" element=
              {<Menu page={<SearchPage category="cryptos" />} />} />
            <Route path="/etf" element=
              {<Menu page={<SearchPage category="etfs" />} />} />
            <Route path="/obligations" element=
              {<Menu page={<SearchPage category="bonds" />} />} />

            <Route path="/" element={<AboutPage />} />
            <Route path="/stats" element={<Menu page={<StatsPage />} />} />
            
          </Routes>
          </Menu>
          <div>
            <Menu />
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
