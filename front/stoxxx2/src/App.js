import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Toolbar } from '@mui/material';
import { Routes, Route } from "react-router-dom";

import Menu from './components/menu';
import SettingsPage from './components/settings';
import AboutPage from './components/about';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <Toolbar />
      <div className="App">

        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
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
