import './App.css';
import { Toolbar } from '@mui/material';
import { Routes, Route } from "react-router-dom";

import Menu from './components/menu';
import SearchPage from './components/searchPage';
import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import StatsPage from './components/statsPage';

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

  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        <Toolbar />
        <div className="App">
          <Menu>
            <Routes>
              <Route path="/forex" element={<SearchPage category="currencies" />} />
              <Route path="/comodies" element={<SearchPage category="commodities" />} />
              <Route path="/indices" element={<SearchPage category="indices" />} />
              <Route path="/stocks" element={<SearchPage category="stocks" />} />
              <Route path="/crypto" element={<SearchPage category="cryptos" />} />
              <Route path="/etf" element={<SearchPage category="etfs" />} />
              <Route path="/obligations" element={<SearchPage category="bonds" />} />
              <Route path="/stats" element={<StatsPage />} />

              <Route path="/" element={<SearchPage category="stocks" />} />
            </Routes>
          </Menu>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
