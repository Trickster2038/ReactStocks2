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

export const ApiContext = React.createContext('light');

function App() {
  // const { t } = useTranslation();

  return (
    <div>
      <Toolbar />
      <div className="App">

        <Routes>
          <Route path="/settings" element={<Menu page={<SettingsPage />} />} />
          <Route path="/about" element={<Menu page={<AboutPage />} />} />

          <Route path="/forex" element=
            {<Menu page={<SearchPage category="forex" />} />} />
          <Route path="/comodies" element=
            {<Menu page={<SearchPage category="comodies" />} />} />
          <Route path="/indexies" element=
            {<Menu page={<SearchPage category="indexies" />} />} />
          <Route path="/stocks" element=
            {<Menu page={<SearchPage category="stocks" />} />} />
          <Route path="/crypto" element=
            {<Menu page={<SearchPage category="crypto" />} />} />
          <Route path="/etf" element=
            {<Menu page={<SearchPage category="etf" />} />} />
          <Route path="/obligations" element=
            {<Menu page={<SearchPage category="obligations" />} />} />

          <Route path="/" element={<AboutPage />} />
        </Routes>

        <div>
          <Menu />
        </div>

      </div>
    </div>
  );
}

export default App;
